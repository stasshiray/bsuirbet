import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import { gameService } from '../services/GameService';

const router = Router();

// Categories API
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allGames = await gameService.getAllGames();

    const categories = [...new Set(allGames.map((game) => game.category))];
    res.json({
      success: true,
      categories,
    });
  } catch (error) {
    next(error);
  }
});

export default router;

