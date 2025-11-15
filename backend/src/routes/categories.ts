import { Router, Request, Response, NextFunction } from 'express';
import { getAllGames } from '../utils';

const router = Router();

// Categories API
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    const allGames = getAllGames();
    const categories = [...new Set(allGames.map(game => game.category))];
    res.json({
      success: true,
      categories
    });
  } catch (error) {
    next(error);
  }
});

export default router;

