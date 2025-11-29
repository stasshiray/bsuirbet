import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Game } from './Game';

@Entity('providers')
export class Provider {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  logo!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ default: true })
  isActive!: boolean;

  @OneToMany(() => Game, (game) => game.provider)
  games!: Game[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

