import type { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Bonus } from '../entities/Bonus';

export class BonusService {
  private readonly bonusRepository: Repository<Bonus>;

  constructor() {
    this.bonusRepository = AppDataSource.getRepository(Bonus);
  }

  async getAllBonuses(): Promise<Bonus[]> {
    return this.bonusRepository.find();
  }

  async getBonusById(id: number): Promise<Bonus | null> {
    return this.bonusRepository.findOne({ where: { id } });
  }
}

export const bonusService = new BonusService();


