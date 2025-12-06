import type { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Tournament } from '../entities/Tournament';

export class TournamentService {
  private readonly tournamentRepository: Repository<Tournament>;

  constructor() {
    this.tournamentRepository = AppDataSource.getRepository(Tournament);
  }

  async getAllTournaments(): Promise<Tournament[]> {
    return this.tournamentRepository.find();
  }

  async getTournamentById(id: number): Promise<Tournament | null> {
    return this.tournamentRepository.findOne({ where: { id } });
  }
}

export const tournamentService = new TournamentService();


