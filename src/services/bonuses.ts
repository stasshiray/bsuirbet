/**
 * Bonus type definitions and utility functions
 * This module contains all bonus-related types, interfaces, and utility functions
 * for working with discriminated unions and bonus management.
 */

import { assertNever } from '../utils';

// Base bonus interface
interface BaseBonus {
  id: number;
  title: string;
  description: string;
  amount: string;
  isActive: boolean;
  terms: string;
  icon: string;
  color: string;
}

// Welcome bonus types
export interface WelcomeBonus extends BaseBonus {
  category: 'welcome';
  type: 'welcome' | 'no-deposit' | 'first-deposit';
  welcomeType: 'new-user' | 'first-deposit' | 'no-deposit';
  maxAmount?: number;
  minDeposit?: number;
  wageringRequirement?: number;
}

// VIP bonus types
export interface VipBonus extends BaseBonus {
  category: 'vip';
  type: 'vip-welcome' | 'vip-cashback' | 'vip-birthday' | 'vip-exclusive';
  vipLevel: 'gold' | 'platinum' | 'diamond';
  exclusiveFeatures: string[];
  personalManager?: boolean;
  higherLimits?: boolean;
}

// Daily bonus types
export interface DailyBonus extends BaseBonus {
  category: 'daily';
  type: 'daily-cashback' | 'daily-spins' | 'weekend' | 'loyalty';
  frequency: 'daily' | 'weekly' | 'monthly';
  resetTime?: string;
  maxClaims?: number;
  currentClaims?: number;
}

// Discriminated union for all bonus types
export type Bonus = WelcomeBonus | VipBonus | DailyBonus;

// Type guards for bonus discrimination
export const isWelcomeBonus = (bonus: Bonus): bonus is WelcomeBonus => 
  bonus.category === 'welcome';

export const isVipBonus = (bonus: Bonus): bonus is VipBonus => 
  bonus.category === 'vip';

export const isDailyBonus = (bonus: Bonus): bonus is DailyBonus => 
  bonus.category === 'daily';

// Utility functions for working with discriminated unions
export const getBonusCategoryInfo = (bonus: Bonus) => {
  if (isWelcomeBonus(bonus)) {
    return {
      category: 'welcome',
      displayName: 'Добро пожаловать',
      icon: '🎁',
      color: '#4caf50',
      description: 'Специальные бонусы для новых игроков'
    };
  }
  
  if (isVipBonus(bonus)) {
    return {
      category: 'vip',
      displayName: 'VIP',
      icon: '👑',
      color: '#ffd700',
      description: 'Эксклюзивные предложения для VIP игроков'
    };
  }
  
  if (isDailyBonus(bonus)) {
    return {
      category: 'daily',
      displayName: 'Ежедневно',
      icon: '🎰',
      color: '#4a90e2',
      description: 'Регулярные награды для активных игроков'
    };
  }
  
  // This ensures exhaustive checking - TypeScript will error if we miss a case
  return assertNever(bonus);
};

// Helper function to get bonus-specific requirements
export const getBonusRequirements = (bonus: Bonus) => {
  if (isWelcomeBonus(bonus)) {
    return {
      minDeposit: bonus.minDeposit,
      maxAmount: bonus.maxAmount,
      wageringRequirement: bonus.wageringRequirement,
      welcomeType: bonus.welcomeType
    };
  }
  
  if (isVipBonus(bonus)) {
    return {
      vipLevel: bonus.vipLevel,
      exclusiveFeatures: bonus.exclusiveFeatures,
      personalManager: bonus.personalManager,
      higherLimits: bonus.higherLimits
    };
  }
  
  if (isDailyBonus(bonus)) {
    return {
      frequency: bonus.frequency,
      resetTime: bonus.resetTime,
      maxClaims: bonus.maxClaims,
      currentClaims: bonus.currentClaims
    };
  }
  
  // This ensures exhaustive checking - TypeScript will error if we miss a case
  return assertNever(bonus);
};


// Example of using assertNever with bonus type switching
export const getBonusTypeIcon = (bonus: Bonus): string => {
  switch (bonus.type) {
    // Welcome bonus types
    case 'welcome':
      return '🎁';
    case 'no-deposit':
      return '🎯';
    case 'first-deposit':
      return '💰';
    
    // VIP bonus types
    case 'vip-welcome':
      return '👑';
    case 'vip-cashback':
      return '💎';
    case 'vip-birthday':
      return '🎂';
    case 'vip-exclusive':
      return '⭐';
    
    // Daily bonus types
    case 'daily-cashback':
      return '💸';
    case 'daily-spins':
      return '🎰';
    case 'weekend':
      return '🎉';
    case 'loyalty':
      return '⭐';
    
    default:
      // This ensures exhaustive checking - TypeScript will error if we add a new type
      return assertNever(bonus);
  }
};

// Additional utility functions for bonus management
export const getBonusStatus = (bonus: Bonus): 'active' | 'inactive' | 'expired' => {
  if (!bonus.isActive) {
    return 'inactive';
  }
  
  // Add logic for expired bonuses based on dates, etc.
  return 'active';
};

export const canClaimBonus = (bonus: Bonus): boolean => {
  if (!bonus.isActive) {
    return false;
  }
  
  if (isDailyBonus(bonus)) {
    return (bonus.currentClaims || 0) < (bonus.maxClaims || 1);
  }
  
  return true;
};

export const getBonusDisplayAmount = (bonus: Bonus): string => {
  return bonus.amount;
};

export const getBonusCategoryColor = (bonus: Bonus): string => {
  const categoryInfo = getBonusCategoryInfo(bonus);
  return categoryInfo.color;
};

export const getBonusCategoryIcon = (bonus: Bonus): string => {
  const categoryInfo = getBonusCategoryInfo(bonus);
  return categoryInfo.icon;
};
