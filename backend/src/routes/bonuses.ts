import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import { bonusService } from '../services/BonusService';
import { NotFoundError, BadRequestError } from '../utils/errors';

const router = Router();

function withErrorHandling(fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  }
}

// Bonuses API
router.get('/', withErrorHandling(async (req: Request, res: Response, next: NextFunction) => {
    const allBonuses = await bonusService.getAllBonuses();
    res.json(allBonuses);
}));

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number.parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
      return next(NotFoundError('Invalid bonus ID'));
    }

    const bonus = await bonusService.getBonusById(id);

    if (!bonus) {
      return next(NotFoundError('Bonus not found'));
    }

    res.json(bonus);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/:id/claim',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number.parseInt(req.params.id, 10);

      if (Number.isNaN(id)) {
        return next(NotFoundError('Invalid bonus ID'));
      }

      const bonus = await bonusService.getBonusById(id);

      if (!bonus) {
        return next(NotFoundError('Bonus not found'));
      }

      if (!bonus.isActive) {
        return next(BadRequestError('Bonus is not active'));
      }

      // Simulate successful bonus claim (no DB persistence yet)
      res.json({
        success: true,
        message: 'Bonus claimed successfully',
        bonus,
      });
    } catch (error) {
      next(error);
    }
  },
);

export default router;

