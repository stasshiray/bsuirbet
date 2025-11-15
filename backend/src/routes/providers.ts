import { Router, Request, Response, NextFunction } from 'express';
import { providers } from '../data';
import { NotFoundError } from '../utils/errors';

const router = Router();

// Providers API
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(providers);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const provider = providers.find(p => p.id === id);

    if (!provider) {
      return next(NotFoundError('Provider not found'));
    }

    res.json(provider);
  } catch (error) {
    next(error);
  }
});

export default router;

