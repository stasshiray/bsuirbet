import { Request, Response, NextFunction } from "express";
import type { User } from "../entities/User";
import { userService } from "../services/UserService";
import { jwtService } from "../services/JwtService";
import { UnauthorizedError } from "../utils/errors";

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const authenticate = async (
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

    // Verify JWT token
    const decoded = jwtService.verifyToken(token);
    if (!decoded) {
      return next(UnauthorizedError("Invalid token"));
    }

    // Get user from database
    const user = await userService.findById(decoded.id);
    if (!user) {
      return next(UnauthorizedError("User not found"));
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

