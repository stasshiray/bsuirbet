import React from 'react';
import type { Bonus } from '../services/api';
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

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'welcome': return 'Добро пожаловать';
      case 'vip': return 'VIP';
      case 'daily': return 'Ежедневно';
      default: return '';
    }
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
