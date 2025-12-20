import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import { bonusService } from '../services/BonusService';
import { NotFoundError, BadRequestError, UnauthorizedError } from '../utils/errors';
import { authenticateKeycloak } from '../middleware/keycloakAuth';

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

/**
 * @swagger
 * /api/bonuses:
 *   get:
 *     summary: Get all bonuses
 *     tags: [Bonuses]
 *     responses:
 *       200:
 *         description: List of all bonuses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bonus'
 */
// Bonuses API
router.get('/', withErrorHandling(async (req: Request, res: Response, next: NextFunction) => {
    const allBonuses = await bonusService.getAllBonuses();
    res.json(allBonuses);
}));

/**
 * @swagger
 * /api/bonuses/{id}:
 *   get:
 *     summary: Get bonus by ID
 *     tags: [Bonuses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Bonus ID
 *     responses:
 *       200:
 *         description: Bonus details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bonus'
 *       404:
 *         description: Bonus not found
 */
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

/**
 * @swagger
 * /api/bonuses/{id}/claim:
 *   post:
 *     summary: Claim a bonus
 *     tags: [Bonuses]
 *     security:
 *       - keycloak: []
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Bonus ID
 *     responses:
 *       200:
 *         description: Bonus claimed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Bonus claimed successfully
 *                 bonus:
 *                   $ref: '#/components/schemas/Bonus'
 *       400:
 *         description: Bad request - bonus is not active
 *       401:
 *         description: Unauthorized - authentication required
 *       404:
 *         description: Bonus not found
 */
router.post(
  '/:id/claim',
  authenticateKeycloak,
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

