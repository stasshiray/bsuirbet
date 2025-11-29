import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Game } from './Game';

@Entity('jackpots')
export class Jackpot {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  gameId!: number;

  @Column({ type: 'varchar' })
  amount!: string;

  @OneToOne(() => Game, (game) => game.jackpotData)
  @JoinColumn({ name: 'gameId' })
  game!: Game;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

