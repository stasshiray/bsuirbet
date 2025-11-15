import express from 'express';
import cors from 'cors';
import gamesRouter from './routes/games';
import tournamentsRouter from './routes/tournaments';
import bonusesRouter from './routes/bonuses';
import providersRouter from './routes/providers';
import jackpotsRouter from './routes/jackpots';
import authRouter from './routes/auth';
import translationsRouter from './routes/translations';
import categoriesRouter from './routes/categories';
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFound';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/games', gamesRouter);
app.use('/api/tournaments', tournamentsRouter);
app.use('/api/bonuses', bonusesRouter);
app.use('/api/providers', providersRouter);
app.use('/api/jackpots', jackpotsRouter);
app.use('/api/auth', authRouter);
app.use('/api/translations', translationsRouter);
app.use('/api/categories', categoriesRouter);

// 404 handler (must be after all routes)
app.use(notFoundHandler);

// Error handler (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

