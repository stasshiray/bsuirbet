import { Router, Request, Response, NextFunction } from "express";
import { authenticate } from "../middleware/auth";
import { userService } from "../services/UserService";
import { BadRequestError } from "../utils/errors";

const router = Router();

// Helper function to transform User entity to API response format
function transformUser(user: any) {
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

// Update user's first name and/or last name
router.patch(
  "/me",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { firstName, lastName } = req.body;

      // Check if at least one field is provided
      if (!firstName && !lastName) {
        return next(
          BadRequestError("At least firstName or lastName must be provided")
        );
      }

      // Get authenticated user from request
      const user = req.user!;

      // Update fields if provided
      if (firstName !== undefined) {
        if (typeof firstName !== "string" || firstName.trim().length === 0) {
          return next(BadRequestError("firstName must be a non-empty string"));
        }
        user.firstName = firstName.trim();
      }

      if (lastName !== undefined) {
        if (typeof lastName !== "string" || lastName.trim().length === 0) {
          return next(BadRequestError("lastName must be a non-empty string"));
        }
        user.lastName = lastName.trim();
      }

      // Save updated user
      const updatedUser = await userService.updateUser(user);

      res.json({
        success: true,
        message: "User updated successfully",
        user: transformUser(updatedUser),
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;

