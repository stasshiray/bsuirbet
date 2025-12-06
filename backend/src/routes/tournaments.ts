import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import { tournamentService } from '../services/TournamentService';
import { NotFoundError, BadRequestError } from '../utils/errors';

const router = Router();

// Tournaments API
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allTournaments = await tournamentService.getAllTournaments();
    res.json(allTournaments);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number.parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
      return next(NotFoundError('Invalid tournament ID'));
    }

    const tournament = await tournamentService.getTournamentById(id);

    if (!tournament) {
      return next(NotFoundError('Tournament not found'));
    }

    res.json(tournament);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/:id/participate',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number.parseInt(req.params.id, 10);

      if (Number.isNaN(id)) {
        return next(NotFoundError('Invalid tournament ID'));
      }

      const tournament = await tournamentService.getTournamentById(id);

      if (!tournament) {
        return next(NotFoundError('Tournament not found'));
      }

      if (tournament.participants >= tournament.maxParticipants) {
        return next(BadRequestError('Tournament is full'));
      }

      // Simulate successful participation (no DB persistence yet)
      res.json({
        success: true,
        message: 'Successfully joined tournament',
        tournament: {
          ...tournament,
          participants: tournament.participants + 1,
        },
      });
    } catch (error) {
      next(error);
    }
  },
);

export default router;

