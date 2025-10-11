import React from 'react';
import type { Bonus } from './bonuses';
import { isWelcomeBonus, isVipBonus, isDailyBonus } from './bonuses';
import './BonusCard.css';

interface BonusCardProps {
  bonus: Bonus;
  onClaim?: () => void;
}

const BonusCard: React.FC<BonusCardProps> = ({ bonus, onClaim }) => {
  const getCategoryClass = (category: string) => {
    switch (category) {
      case 'welcome': return 'bonus-welcome';
      case 'vip': return 'bonus-vip';
      case 'daily': return 'bonus-daily';
      default: return '';
    }
  };

  // Example of using other utility functions from utils.ts
  // import { formatCurrency } from '../utils';
  // const formattedAmount = formatCurrency(100); // Would format as "100,00 BYN"

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'welcome': return 'Добро пожаловать';
      case 'vip': return 'VIP';
      case 'daily': return 'Ежедневно';
      default: return '';
    }
  };

  // Type-safe rendering based on bonus category
  const renderBonusSpecificInfo = () => {
    if (isWelcomeBonus(bonus)) {
      return (
        <div className="bonus-specific-info">
          <div className="info-item">
            <span className="info-label">Тип:</span>
            <span className="info-value">{bonus.welcomeType}</span>
          </div>
          {bonus.maxAmount && (
            <div className="info-item">
              <span className="info-label">Макс. сумма:</span>
              <span className="info-value">{bonus.maxAmount} BYN</span>
            </div>
          )}
          {bonus.wageringRequirement && (
            <div className="info-item">
              <span className="info-label">Вейджер:</span>
              <span className="info-value">{bonus.wageringRequirement}x</span>
            </div>
          )}
        </div>
      );
    }

    if (isVipBonus(bonus)) {
      return (
        <div className="bonus-specific-info">
          <div className="info-item">
            <span className="info-label">VIP Уровень:</span>
            <span className="info-value vip-level">{bonus.vipLevel}</span>
          </div>
          {bonus.personalManager && (
            <div className="info-item">
              <span className="info-label">Персональный менеджер:</span>
              <span className="info-value">✓</span>
            </div>
          )}
          <div className="info-item">
            <span className="info-label">Эксклюзивные функции:</span>
            <span className="info-value">{bonus.exclusiveFeatures.join(', ')}</span>
          </div>
        </div>
      );
    }

    if (isDailyBonus(bonus)) {
      return (
        <div className="bonus-specific-info">
          <div className="info-item">
            <span className="info-label">Частота:</span>
            <span className="info-value">{bonus.frequency}</span>
          </div>
          {bonus.resetTime && (
            <div className="info-item">
              <span className="info-label">Сброс:</span>
              <span className="info-value">{bonus.resetTime}</span>
            </div>
          )}
          {bonus.maxClaims && (
            <div className="info-item">
              <span className="info-label">Использовано:</span>
              <span className="info-value">{bonus.currentClaims}/{bonus.maxClaims}</span>
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className={`bonus-card ${getCategoryClass(bonus.category)} ${bonus.isActive ? 'active' : 'inactive'}`}>
      <div className="bonus-category-badge">
        {getCategoryLabel(bonus.category)}
      </div>
      
      <div className="bonus-header">
        <div className="bonus-icon" style={{ color: bonus.color }}>
          {bonus.icon}
        </div>
        <div className="bonus-status">
          {bonus.isActive ? (
            <span className="status-active">Активен</span>
          ) : (
            <span className="status-inactive">Недоступен</span>
          )}
        </div>
      </div>

      <div className="bonus-content">
        <h3 className="bonus-title">{bonus.title}</h3>
        <p className="bonus-description">{bonus.description}</p>
        
        <div className="bonus-amount">
          <span className="amount-label">Размер бонуса:</span>
          <span className="amount-value" style={{ color: bonus.color }}>
            {bonus.amount}
          </span>
        </div>

        <div className="bonus-terms">
          <span className="terms-label">Условия:</span>
          <span className="terms-text">{bonus.terms}</span>
        </div>

        {renderBonusSpecificInfo()}
      </div>

      <div className="bonus-actions">
        {bonus.isActive ? (
          <>
            <button className="btn-primary" onClick={onClaim}>
              Получить бонус
            </button>
            <button className="btn-secondary">Подробнее</button>
          </>
        ) : (
          <button className="btn-disabled" disabled>
            Недоступно
          </button>
        )}
      </div>
    </div>
  );
};

export default BonusCard;
