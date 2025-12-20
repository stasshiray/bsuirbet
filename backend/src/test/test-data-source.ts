import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { Provider } from '../entities/Provider';
import { Game } from '../entities/Game';
import { Tournament } from '../entities/Tournament';
import { Bonus } from '../entities/Bonus';
import { Jackpot } from '../entities/Jackpot';
import { TournamentParticipant } from '../entities/TournamentParticipant';
import { BonusClaim } from '../entities/BonusClaim';

// Test database configuration - uses separate database
export const TestDataSource = new DataSource({
  type: 'postgres',
  host: process.env.TEST_POSTGRES_HOST || process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.TEST_POSTGRES_PORT || process.env.POSTGRES_PORT || '5432'),
  username: process.env.TEST_POSTGRES_USER || process.env.POSTGRES_USER || 'bsuirbet',
  password: process.env.TEST_POSTGRES_PASSWORD || process.env.POSTGRES_PASSWORD || 'bsuirbet123',
  database: process.env.TEST_POSTGRES_DB || 'bsuirbet_test',
  synchronize: true, // Always synchronize in tests
  logging: false, // Disable logging in tests
  dropSchema: true, // Drop schema before each test run
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
});

