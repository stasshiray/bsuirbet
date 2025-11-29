import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BonusClaim } from './BonusClaim';

export enum BonusType {
  WELCOME = 'welcome',
  NO_DEPOSIT = 'no-deposit',
  FIRST_DEPOSIT = 'first-deposit',
  VIP_WELCOME = 'vip-welcome',
  VIP_CASHBACK = 'vip-cashback',
  VIP_BIRTHDAY = 'vip-birthday',
  DAILY_CASHBACK = 'daily-cashback',
  DAILY_SPINS = 'daily-spins',
  WEEKEND = 'weekend',
}

export enum BonusCategory {
  WELCOME = 'welcome',
  VIP = 'vip',
  DAILY = 'daily',
}

@Entity('bonuses')
export class Bonus {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column()
  amount!: string;

  @Column({
    type: 'enum',
    enum: BonusType,
  })
  type!: BonusType;

  @Column({
    type: 'enum',
    enum: BonusCategory,
  })
  category!: BonusCategory;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ type: 'text' })
  terms!: string;

  @Column()
  icon!: string;

  @Column()
  color!: string;

  @Column({ type: 'jsonb', nullable: true })
  additionalProperties!: Record<string, any> | null;

  @OneToMany(() => BonusClaim, (claim: BonusClaim) => claim.bonus)
  bonusClaims!: BonusClaim[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

