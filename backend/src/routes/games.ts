import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import { gameService } from '../services/GameService';
import { NotFoundError } from '../utils/errors';

const router = Router();

// Games API
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = req.query.category;
    const allGames = await gameService.getAllGames();

    if (!categories || (Array.isArray(categories) && categories.length === 0)) {
      return res.json(allGames);
    }

    const categoryArray = Array.isArray(categories) ? categories : [categories];
    const filteredGames = allGames.filter((game) =>
      categoryArray.includes(game.category),
    );

    res.json(filteredGames);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number.parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
      return next(NotFoundError('Invalid game ID'));
    }

    const game = await gameService.getGameById(id);

    if (!game) {
      return next(NotFoundError('Game not found'));
    }

    res.json(game);
  } catch (error) {
    next(error);
  }
});

export default router;

