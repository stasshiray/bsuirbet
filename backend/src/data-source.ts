import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entities/User';
import { Provider } from './entities/Provider';
import { Game } from './entities/Game';
import { Tournament } from './entities/Tournament';
import { Bonus } from './entities/Bonus';
import { Jackpot } from './entities/Jackpot';
import { TournamentParticipant } from './entities/TournamentParticipant';
import { BonusClaim } from './entities/BonusClaim';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  username: process.env.POSTGRES_USER || 'bsuirbet',
  password: process.env.POSTGRES_PASSWORD || 'bsuirbet123',
  database: process.env.POSTGRES_DB || 'bsuirbet',
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
  entities: [
    User,
    Provider,
    Game,
    Tournament,
    Bonus,
    Jackpot,
    TournamentParticipant,
    BonusClaim,
  ],
  migrations: ['src/migrations/**/*.ts'],
  migrationsRun: true,
  // subscribers: ['src/subscribers/**/*.ts'],
});

