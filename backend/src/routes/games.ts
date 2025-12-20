import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import { gameService } from '../services/GameService';
import { NotFoundError } from '../utils/errors';

const router = Router();

/**
 * @swagger
 * /api/games:
 *   get:
 *     summary: Get all games
 *     tags: [Games]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter games by category (can be multiple values)
 *         example: slots
 *     responses:
 *       200:
 *         description: List of games
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Game'
 */
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

/**
 * @swagger
 * /api/games/{id}:
 *   get:
 *     summary: Get game by ID
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Game ID
 *     responses:
 *       200:
 *         description: Game details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 *       404:
 *         description: Game not found
 */
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

