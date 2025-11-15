import { Router, Request, Response, NextFunction } from 'express';
import { bonuses } from '../data';
import { NotFoundError, BadRequestError } from '../utils/errors';

const router = Router();

// Bonuses API
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(bonuses);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return next(NotFoundError('Invalid bonus ID'));
    }

    const bonus = bonuses.find(b => b.id === id);

    if (!bonus) {
      return next(NotFoundError('Bonus not found'));
    }

    res.json(bonus);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/claim', (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return next(NotFoundError('Invalid bonus ID'));
    }

    const bonus = bonuses.find(b => b.id === id);

    if (!bonus) {
      return next(NotFoundError('Bonus not found'));
    }

    if (!bonus.isActive) {
      return next(BadRequestError('Bonus is not active'));
    }

    // Simulate successful bonus claim
    res.json({
      success: true,
      message: 'Bonus claimed successfully',
      bonus
    });
  } catch (error) {
    next(error);
  }
});

export default router;

