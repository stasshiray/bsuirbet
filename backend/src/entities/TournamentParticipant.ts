import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Unique,
} from 'typeorm';
import { User } from './User';
import { Tournament } from './Tournament';

@Entity('tournament_participants')
@Unique(['userId', 'tournamentId'])
export class TournamentParticipant {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @Column()
  tournamentId!: number;

  @ManyToOne(() => User, (user) => user.tournamentParticipants)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @ManyToOne(() => Tournament, (tournament) => tournament.tournamentParticipants)
  @JoinColumn({ name: 'tournamentId' })
  tournament!: Tournament;

  @CreateDateColumn()
  joinedAt!: Date;
}

