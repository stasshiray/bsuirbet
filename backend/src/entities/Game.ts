import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Provider } from './Provider';
import { Jackpot } from './Jackpot';

@Entity('games')
export class Game {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  category!: string;

  @Column()
  image!: string;

  @Column({ type: 'varchar', nullable: true })
  jackpot!: string | null;

  @Column({ default: false })
  isHot!: boolean;

  @Column()
  providerId!: string;

  @ManyToOne(() => Provider, (provider) => provider.games)
  @JoinColumn({ name: 'providerId' })
  provider!: Provider;

  @OneToOne(() => Jackpot, (jackpot) => jackpot.game)
  jackpotData!: Jackpot | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

