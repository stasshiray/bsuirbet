import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from './User';
import { Bonus } from './Bonus';

@Entity('bonus_claims')
export class BonusClaim {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @Column()
  bonusId!: number;

  @ManyToOne(() => User, (user) => user.bonusClaims)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @ManyToOne(() => Bonus, (bonus) => bonus.bonusClaims)
  @JoinColumn({ name: 'bonusId' })
  bonus!: Bonus;

  @CreateDateColumn()
  claimedAt!: Date;
}

