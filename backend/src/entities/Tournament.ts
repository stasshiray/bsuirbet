import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TournamentParticipant } from './TournamentParticipant';

export enum TournamentStatus {
  UPCOMING = 'upcoming',
  ACTIVE = 'active',
  ENDED = 'ended',
}

@Entity('tournaments')
export class Tournament {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  prize!: string;

  @Column({ default: 0 })
  participants!: number;

  @Column()
  maxParticipants!: number;

  @Column({ type: 'date' })
  startDate!: Date;

  @Column({ type: 'date' })
  endDate!: Date;

  @Column({
    type: 'enum',
    enum: TournamentStatus,
    default: TournamentStatus.UPCOMING,
  })
  status!: TournamentStatus;

  @Column()
  game!: string;

  @Column()
  image!: string;

  @OneToMany(() => TournamentParticipant, (participant) => participant.tournament)
  tournamentParticipants!: TournamentParticipant[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

