import { Router, Request, Response, NextFunction } from 'express';
import { getAllGames } from '../utils';
import { NotFoundError } from '../utils/errors';

const router = Router();

// Games API
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = req.query.category;
    const allGames = getAllGames();

    if (!categories || (Array.isArray(categories) && categories.length === 0)) {
      return res.json(allGames);
    }

    const categoryArray = Array.isArray(categories) ? categories : [categories];
    const filteredGames = allGames.filter(game =>
      categoryArray.includes(game.category)
    );

    res.json(filteredGames);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return next(NotFoundError('Invalid game ID'));
    }

    const allGames = getAllGames();
    const game = allGames.find(g => g.id === id);

    if (!game) {
      return next(NotFoundError('Game not found'));
    }

    res.json(game);
  } catch (error) {
    next(error);
  }
});

export default router;

