import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import { providerService } from '../services/ProviderService';
import { NotFoundError } from '../utils/errors';

const router = Router();

// Providers API
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allProviders = await providerService.getAllProviders();
    res.json(allProviders);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;

    const provider = await providerService.getProviderById(id);

    if (!provider) {
      return next(NotFoundError('Provider not found'));
    }

    res.json(provider);
  } catch (error) {
    next(error);
  }
});

export default router;

