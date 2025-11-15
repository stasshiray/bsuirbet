import { Router, Request, Response, NextFunction } from 'express';
import { getAllGames } from '../utils';

const router = Router();

// Jackpot API
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    const allGames = getAllGames();
    const jackpots = allGames
      .filter(game => game.jackpot)
      .map(game => ({
        gameId: game.id,
        amount: game.jackpot
      }));

    res.json(jackpots);
  } catch (error) {
    next(error);
  }
});

export default router;

