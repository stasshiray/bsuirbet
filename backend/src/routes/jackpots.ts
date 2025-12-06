import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import { jackpotService } from '../services/JackpotService';

const router = Router();

// Jackpot API
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jackpots = await jackpotService.getAllJackpots();

    // Keep the same response shape as before
    const response = jackpots.map((jackpot) => ({
      gameId: jackpot.gameId,
      amount: jackpot.amount,
    }));

    res.json(response);
  } catch (error) {
    next(error);
  }
});

export default router;

