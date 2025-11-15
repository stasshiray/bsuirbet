import { Router, Request, Response, NextFunction } from 'express';
import { tournaments } from '../data';
import { NotFoundError, BadRequestError } from '../utils/errors';

const router = Router();

// Tournaments API
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(tournaments);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return next(NotFoundError('Invalid tournament ID'));
    }

    const tournament = tournaments.find(t => t.id === id);

    if (!tournament) {
      return next(NotFoundError('Tournament not found'));
    }

    res.json(tournament);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/participate', (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return next(NotFoundError('Invalid tournament ID'));
    }

    const tournament = tournaments.find(t => t.id === id);

    if (!tournament) {
      return next(NotFoundError('Tournament not found'));
    }

    if (tournament.participants >= tournament.maxParticipants) {
      return next(BadRequestError('Tournament is full'));
    }

    // Simulate successful participation
    res.json({
      success: true,
      message: 'Successfully joined tournament',
      tournament: {
        ...tournament,
        participants: tournament.participants + 1
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router;

