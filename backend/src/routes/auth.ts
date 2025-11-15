import { Router, Request, Response, NextFunction } from 'express';
import type { User } from '../data';
import { UnauthorizedError, BadRequestError } from '../utils/errors';

const router = Router();

// Authentication handlers
router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    // Simple mock validation
    if (email === 'admin@bsuirbet.com' && password === 'admin123') {
      const user: User = {
        id: 1,
        email: 'admin@bsuirbet.com',
        username: 'admin',
        firstName: 'Admin',
        lastName: 'User',
        balance: 10000,
        isVerified: true,
        createdAt: '2024-01-01T00:00:00Z'
      };
      return res.json({
        success: true,
        message: 'Login successful',
        user,
        token: 'mock-jwt-token-1'
      });
    }

    if (email === 'player@bsuirbet.com' && password === 'player123') {
      const user: User = {
        id: 2,
        email: 'player@bsuirbet.com',
        username: 'player1',
        firstName: 'John',
        lastName: 'Doe',
        balance: 2500,
        isVerified: true,
        createdAt: '2024-01-15T00:00:00Z'
      };
      return res.json({
        success: true,
        message: 'Login successful',
        user,
        token: 'mock-jwt-token-2'
      });
    }

    // Demo accounts from handlers.ts
    if (email === 'demo@bsuirbet.com' && password === 'demo123') {
      const user: User = {
        id: 3,
        email: 'demo@bsuirbet.com',
        username: 'demo',
        firstName: 'Demo',
        lastName: 'User',
        balance: 5000,
        isVerified: true,
        createdAt: '2024-01-10T00:00:00Z'
      };
      return res.json({
        success: true,
        message: 'Login successful',
        user,
        token: 'mock-jwt-token-3'
      });
    }

    if (email === 'test@bsuirbet.com' && password === 'test123') {
      const user: User = {
        id: 4,
        email: 'test@bsuirbet.com',
        username: 'test',
        firstName: 'Test',
        lastName: 'User',
        balance: 1000,
        isVerified: true,
        createdAt: '2024-01-12T00:00:00Z'
      };
      return res.json({
        success: true,
        message: 'Login successful',
        user,
        token: 'mock-jwt-token-4'
      });
    }

    return next(UnauthorizedError('Invalid email or password'));
  } catch (error) {
    next(error);
  }
});

router.post('/signup', (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, username, firstName, lastName } = req.body;

    // Check if user already exists (simple mock check)
    if (
      email === 'admin@bsuirbet.com' ||
      email === 'player@bsuirbet.com' ||
      email === 'demo@bsuirbet.com' ||
      email === 'test@bsuirbet.com'
    ) {
      return next(BadRequestError('User with this email already exists'));
    }

    // Create new user
    const newUser: User = {
      id: Math.floor(Math.random() * 1000) + 3,
      email,
      username,
      firstName,
      lastName,
      balance: 100, // Welcome bonus
      isVerified: false,
      createdAt: new Date().toISOString()
    };

    res.json({
      success: true,
      message: 'Account created successfully',
      user: newUser,
      token: 'mock-jwt-token-' + newUser.id
    });
  } catch (error) {
    next(error);
  }
});

router.post('/logout', (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    next(error);
  }
});

router.get('/me', (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(UnauthorizedError('No token provided'));
    }

    const token = authHeader.replace('Bearer ', '');

    // Mock user data based on token
    let user: User | undefined;
    if (token === 'mock-jwt-token-1') {
      user = {
        id: 1,
        email: 'admin@bsuirbet.com',
        username: 'admin',
        firstName: 'Admin',
        lastName: 'User',
        balance: 10000,
        isVerified: true,
        createdAt: '2024-01-01T00:00:00Z'
      };
    } else if (token === 'mock-jwt-token-2') {
      user = {
        id: 2,
        email: 'player@bsuirbet.com',
        username: 'player1',
        firstName: 'John',
        lastName: 'Doe',
        balance: 2500,
        isVerified: true,
        createdAt: '2024-01-15T00:00:00Z'
      };
    } else if (token === 'mock-jwt-token-3') {
      user = {
        id: 3,
        email: 'demo@bsuirbet.com',
        username: 'demo',
        firstName: 'Demo',
        lastName: 'User',
        balance: 5000,
        isVerified: true,
        createdAt: '2024-01-10T00:00:00Z'
      };
    } else if (token === 'mock-jwt-token-4') {
      user = {
        id: 4,
        email: 'test@bsuirbet.com',
        username: 'test',
        firstName: 'Test',
        lastName: 'User',
        balance: 1000,
        isVerified: true,
        createdAt: '2024-01-12T00:00:00Z'
      };
    }

    if (!user) {
      return next(UnauthorizedError('Invalid token'));
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
});

export default router;

