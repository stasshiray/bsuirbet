import { Router, Request, Response, NextFunction } from "express";
import type { User } from "../entities/User";
import { userService } from "../services/UserService";
import { jwtService } from "../services/JwtService";
import { UnauthorizedError, BadRequestError } from "../utils/errors";

const router = Router();

// Helper function to transform User entity to API response format
function transformUser(user: User) {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    balance: Number(user.balance),
    isVerified: user.isVerified,
    createdAt: user.createdAt.toISOString(),
  };
}

// Authentication handlers
router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(BadRequestError("Email and password are required"));
      }

      // Find user by email
      const user = await userService.findByEmail(email);
      if (!user) {
        return next(UnauthorizedError("Invalid email or password"));
      }

      // Verify password
      const isPasswordValid = await userService.verifyPassword(user, password);
      if (!isPasswordValid) {
        return next(UnauthorizedError("Invalid email or password"));
      }


      const token = jwtService.generateToken(user);

      return res.json({
        success: true,
        message: "Login successful",
        user: transformUser(user),
        token,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/signup",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, username, password, firstName, lastName } = req.body;

      if (!email || !username || !password || !firstName || !lastName) {
        return next(BadRequestError("All fields are required"));
      }

      try {
        // Create new user
        const newUser = await userService.createUser(
          email,
          username,
          password,
          firstName,
          lastName
        );

        // Generate JWT token
        const token = jwtService.generateToken(newUser);

        res.json({
          success: true,
          message: "Account created successfully",
          user: transformUser(newUser),
          token,
        });
      } catch (error) {
        if (error instanceof Error) {
          return next(BadRequestError(error.message));
        }
        throw error;
      }
    } catch (error) {
      next(error);
    }
  }
);

router.post("/logout", (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
});

router.get("/me", async (req: Request, res: Response, next: NextFunction) => {
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

    res.json(transformUser(user));
  } catch (error) {
    next(error);
  }
});

export default router;
