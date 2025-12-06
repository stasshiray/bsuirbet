import type { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Provider } from '../entities/Provider';

export class ProviderService {
  private readonly providerRepository: Repository<Provider>;

  constructor() {
    this.providerRepository = AppDataSource.getRepository(Provider);
  }

  async getAllProviders(): Promise<Provider[]> {
    return this.providerRepository.find();
  }

  async getProviderById(id: string): Promise<Provider | null> {
    return this.providerRepository.findOne({ where: { id } });
  }
}

export const providerService = new ProviderService();


