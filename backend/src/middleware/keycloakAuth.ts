import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import { UnauthorizedError } from "../utils/errors";

// Keycloak configuration
const keycloakUrl = process.env.KEYCLOAK_URL || "http://localhost:4000";
const realm = process.env.KEYCLOAK_REALM || "bsuirbet";
const keycloakIssuer = `${keycloakUrl}/realms/${realm}`;
const jwksUri = `${keycloakIssuer}/protocol/openid-connect/certs`;

// Create JWKS client
const client = jwksClient({
  jwksUri,
  cache: true,
  cacheMaxAge: 86400000, // 24 hours
  rateLimit: true,
  jwksRequestsPerMinute: 10,
});

// Function to get signing key
function getKey(header: jwt.JwtHeader, callback: jwt.SigningKeyCallback) {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      return callback(err);
    }
    const signingKey = key?.getPublicKey();
    callback(null, signingKey);
  });
}

// Extend Express Request to include Keycloak user info
declare global {
  namespace Express {
    interface Request {
      keycloakUser?: {
        sub: string;
        email?: string;
        preferred_username?: string;
        given_name?: string;
        family_name?: string;
        [key: string]: unknown;
      };
    }
  }
}

export const authenticateKeycloak = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(UnauthorizedError("No token provided"));
    }

    const token = authHeader.replace("Bearer ", "");

    // Verify JWT token with Keycloak
    jwt.verify(
      token,
      getKey,
      {
        issuer:
          process.env.NODE_ENV === "production" ? keycloakIssuer : undefined,
        algorithms: ["RS256"],
      },
      (err, decoded) => {
        if (err) {
          console.error("Token verification error:", err);
          return next(UnauthorizedError("Invalid or expired token"));
        }

        if (decoded && typeof decoded === "object") {
          // Attach Keycloak user info to request
          req.keycloakUser = {
            sub: decoded.sub as string,
            email: decoded.email as string | undefined,
            preferred_username: decoded.preferred_username as
              | string
              | undefined,
            given_name: decoded.given_name as string | undefined,
            family_name: decoded.family_name as string | undefined,
            ...decoded,
          };
          next();
        } else {
          return next(UnauthorizedError("Invalid token payload"));
        }
      }
    );
  } catch (error) {
    next(error);
  }
};
