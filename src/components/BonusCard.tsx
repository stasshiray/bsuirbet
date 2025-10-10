import React from 'react';
import './BonusCard.css';

interface Bonus {
  id: number;
  title: string;
  description: string;
  amount: string;
  type: string;
  isActive: boolean;
  terms: string;
}

interface BonusCardProps {
  bonus: Bonus;
}

const BonusCard: React.FC<BonusCardProps> = ({ bonus }) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'deposit': return '💰';
      case 'no-deposit': return '🎁';
      case 'cashback': return '💸';
      case 'birthday': return '🎂';
      case 'vip': return '👑';
      case 'loyalty': return '⭐';
      default: return '🎯';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'deposit': return '#ffd700';
      case 'no-deposit': return '#44ff44';
      case 'cashback': return '#44aaff';
      case 'birthday': return '#ff44aa';
      case 'vip': return '#aa44ff';
      case 'loyalty': return '#ffaa44';
      default: return '#ffffff';
    }
  };

  return (
    <div className={`bonus-card ${bonus.isActive ? 'active' : 'inactive'}`}>
      <div className="bonus-header">
        <div className="bonus-icon" style={{ color: getTypeColor(bonus.type) }}>
          {getTypeIcon(bonus.type)}
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
          <span className="amount-value" style={{ color: getTypeColor(bonus.type) }}>
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
            <button className="btn-primary">Получить бонус</button>
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
