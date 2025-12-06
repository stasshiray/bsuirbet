import type { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Game } from '../entities/Game';

export class GameService {
  private readonly gameRepository: Repository<Game>;

  constructor() {
    this.gameRepository = AppDataSource.getRepository(Game);
  }

  async getAllGames(): Promise<Game[]> {
    return this.gameRepository.find();
  }

  async getGameById(id: number): Promise<Game | null> {
    return this.gameRepository.findOne({ where: { id } });
  }
}

export const gameService = new GameService();


