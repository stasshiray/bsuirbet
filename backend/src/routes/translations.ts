import { Router, Request, Response, NextFunction } from 'express';
import { translations } from '../data';
import { BadRequestError } from '../utils/errors';

const router = Router();

// Translation API endpoints
router.get('/:language', (req: Request, res: Response, next: NextFunction) => {
  try {
    const { language } = req.params;

    if (language !== 'ru' && language !== 'en') {
      return next(BadRequestError('Unsupported language'));
    }

    // Simulate network delay
    setTimeout(() => {
      res.json({
        success: true,
        language,
        translations: translations[language]
      });
    }, 100);
  } catch (error) {
    next(error);
  }
});

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({
      success: true,
      languages: [
        { code: 'ru', name: 'Русский', flag: '🇷🇺' },
        { code: 'en', name: 'English', flag: '🇺🇸' }
      ]
    });
  } catch (error) {
    next(error);
  }
});

export default router;

