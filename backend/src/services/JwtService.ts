import jwt from "jsonwebtoken";
import type { User } from "../entities/User";

const JWT_SECRET: string =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || "7d";

export interface TokenPayload {
  id: number;
  email: string;
}

export class JwtService {
  /**
   * Generate a JWT token for a user
   */
  generateToken(user: User): string {
    const payload: TokenPayload = {
      id: user.id,
      email: user.email,
    };

    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    } as jwt.SignOptions);
  }

  /**
   * Verify a JWT token and return the decoded payload
   * Returns null if token is invalid or expired
   */
  verifyToken(token: string): TokenPayload | null {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
      return decoded;
    } catch (error) {
      return null;
    }
  }
}

export const jwtService = new JwtService();

