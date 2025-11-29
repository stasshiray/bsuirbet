import 'reflect-metadata';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import { Provider } from '../entities/Provider';
import { Game } from '../entities/Game';
import { Tournament, TournamentStatus } from '../entities/Tournament';
import { Bonus, BonusType, BonusCategory } from '../entities/Bonus';
import { Jackpot } from '../entities/Jackpot';
import bcrypt from 'bcryptjs';
import { providers, games, liveGames, tournaments, bonuses } from '../data';

async function initializeDatabase() {
  try {
    console.log('Initializing database...');
    await AppDataSource.initialize();
    console.log('Database connected!');

    const userRepository = AppDataSource.getRepository(User);
    const providerRepository = AppDataSource.getRepository(Provider);
    const gameRepository = AppDataSource.getRepository(Game);
    const tournamentRepository = AppDataSource.getRepository(Tournament);
    const bonusRepository = AppDataSource.getRepository(Bonus);
    const jackpotRepository = AppDataSource.getRepository(Jackpot);

    // Check if data already exists
    const existingUsers = await userRepository.count();
    if (existingUsers > 0) {
      console.log('Database already initialized. Skipping...');
      await AppDataSource.destroy();
      return;
    }

    // Create demo users
    console.log('Creating users...');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const demoUsers = [
      {
        email: 'admin@bsuirbet.com',
        username: 'admin',
        password: hashedPassword,
        firstName: 'Admin',
        lastName: 'User',
        balance: 10000,
        isVerified: true,
      },
      {
        email: 'player@bsuirbet.com',
        username: 'player1',
        password: await bcrypt.hash('player123', 10),
        firstName: 'John',
        lastName: 'Doe',
        balance: 2500,
        isVerified: true,
      },
      {
        email: 'demo@bsuirbet.com',
        username: 'demo',
        password: await bcrypt.hash('demo123', 10),
        firstName: 'Demo',
        lastName: 'User',
        balance: 5000,
        isVerified: true,
      },
      {
        email: 'test@bsuirbet.com',
        username: 'test',
        password: await bcrypt.hash('test123', 10),
        firstName: 'Test',
        lastName: 'User',
        balance: 1000,
        isVerified: true,
      },
    ];

    await userRepository.save(demoUsers);
    console.log('Users created!');

    // Create providers
    console.log('Creating providers...');
    await providerRepository.save(providers);
    console.log('Providers created!');

    // Create games
    console.log('Creating games...');
    const allGames = [...games, ...liveGames];
    await gameRepository.save(allGames);
    console.log('Games created!');

    // Create jackpots for games that have jackpots
    console.log('Creating jackpots...');
    const gamesWithJackpots = allGames.filter((game) => game.jackpot);
    const jackpots = gamesWithJackpots.map((game) => ({
      gameId: game.id,
      amount: game.jackpot!,
    }));
    await jackpotRepository.save(jackpots);
    console.log('Jackpots created!');

    // Create tournaments
    console.log('Creating tournaments...');
    const tournamentEntities = tournaments.map((tournament) => ({
      ...tournament,
      startDate: new Date(tournament.startDate),
      endDate: new Date(tournament.endDate),
      status: tournament.status as TournamentStatus,
    }));
    await tournamentRepository.save(tournamentEntities);
    console.log('Tournaments created!');

    // Create bonuses
    console.log('Creating bonuses...');
    const bonusEntities = bonuses.map((bonus) => {
      const { id, ...bonusData } = bonus;
      const baseFields = ['title', 'description', 'amount', 'type', 'category', 'isActive', 'terms', 'icon', 'color'];
      const additionalProps: Record<string, any> = {};
      
      Object.keys(bonusData).forEach((key) => {
        if (!baseFields.includes(key)) {
          additionalProps[key] = bonusData[key as keyof typeof bonusData];
        }
      });

      return {
        title: bonus.title,
        description: bonus.description,
        amount: bonus.amount,
        type: bonus.type as BonusType,
        category: bonus.category as BonusCategory,
        isActive: bonus.isActive,
        terms: bonus.terms,
        icon: bonus.icon,
        color: bonus.color,
        additionalProperties: Object.keys(additionalProps).length > 0 ? additionalProps : null,
      };
    });
    await bonusRepository.save(bonusEntities);
    console.log('Bonuses created!');

    console.log('Database initialization completed!');
    await AppDataSource.destroy();
  } catch (error) {
    console.error('Error initializing database:', error);
    await AppDataSource.destroy();
    process.exit(1);
  }
}

initializeDatabase();

