import type { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Jackpot } from '../entities/Jackpot';

export class JackpotService {
  private readonly jackpotRepository: Repository<Jackpot>;

  constructor() {
    this.jackpotRepository = AppDataSource.getRepository(Jackpot);
  }

  async getAllJackpots(): Promise<Jackpot[]> {
    return this.jackpotRepository.find();
  }
}

export const jackpotService = new JackpotService();


