import React from 'react';
import BonusCard from '../components/BonusCard';
import './Bonuses.css';

const Bonuses: React.FC = () => {
  const bonuses = [
    {
      id: 1,
      title: 'Приветственный бонус',
      description: 'Получите 100% бонус на первый депозит до 1000 BYN',
      amount: '1000 BYN',
      type: 'deposit',
      isActive: true,
      terms: 'Минимальный депозит 50 BYN. Вейджер x35'
    },
    {
      id: 2,
      title: 'Бездепозитный бонус',
      description: '50 BYN бесплатно при регистрации',
      amount: '50 BYN',
      type: 'no-deposit',
      isActive: true,
      terms: 'Вейджер x40. Максимальный выигрыш 500 BYN'
    },
    {
      id: 3,
      title: 'Еженедельный кэшбэк',
      description: 'Получайте 10% кэшбэк каждую неделю',
      amount: '10%',
      type: 'cashback',
      isActive: true,
      terms: 'Кэшбэк начисляется по понедельникам'
    },
    {
      id: 4,
      title: 'Бонус на день рождения',
      description: 'Специальный бонус в день рождения',
      amount: '500 BYN',
      type: 'birthday',
      isActive: false,
      terms: 'Доступен в течение 7 дней после дня рождения'
    },
    {
      id: 5,
      title: 'VIP бонус',
      description: 'Эксклюзивные бонусы для VIP игроков',
      amount: 'До 5000 BYN',
      type: 'vip',
      isActive: true,
      terms: 'Только для VIP статуса'
    },
    {
      id: 6,
      title: 'Бонус за лояльность',
      description: 'Дополнительные бонусы за активную игру',
      amount: '200 BYN',
      type: 'loyalty',
      isActive: true,
      terms: 'Начисляется ежемесячно'
    }
  ];

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
    <div className="bonuses">
      <section className="bonuses-hero">
        <div className="container">
          <h1 className="page-title">Бонусы и акции</h1>
          <p className="page-subtitle">
            Получайте максимальную выгоду от игры с нашими бонусами!
          </p>
        </div>
      </section>

      <section className="bonuses-content">
        <div className="container">
          <div className="bonuses-header">
            <h2>Доступные бонусы</h2>
            <div className="bonus-filters">
              <button className="filter-btn active">Все</button>
              <button className="filter-btn">Активные</button>
              <button className="filter-btn">VIP</button>
            </div>
          </div>

          <div className="bonuses-grid">
            {bonuses.map(bonus => (
              <BonusCard key={bonus.id} bonus={bonus} />
            ))}
          </div>

          <div className="bonus-terms">
            <h3>Общие условия бонусов</h3>
            <div className="terms-grid">
              <div className="term-item">
                <h4>🎯 Вейджер</h4>
                <p>Все бонусы имеют условия отыгрыша (вейджер)</p>
              </div>
              <div className="term-item">
                <h4>⏰ Срок действия</h4>
                <p>Бонусы действительны в течение ограниченного времени</p>
              </div>
              <div className="term-item">
                <h4>🎮 Игры</h4>
                <p>Некоторые игры могут не учитываться в вейджере</p>
              </div>
              <div className="term-item">
                <h4>📋 Правила</h4>
                <p>Соблюдайте правила казино для получения бонусов</p>
              </div>
            </div>
          </div>

          <div className="loyalty-program">
            <h3>Программа лояльности</h3>
            <div className="loyalty-levels">
              <div className="loyalty-level">
                <div className="level-icon">🥉</div>
                <h4>Бронза</h4>
                <p>0-999 очков</p>
                <ul>
                  <li>Базовые бонусы</li>
                  <li>Стандартная поддержка</li>
                </ul>
              </div>
              <div className="loyalty-level">
                <div className="level-icon">🥈</div>
                <h4>Серебро</h4>
                <p>1000-4999 очков</p>
                <ul>
                  <li>Увеличенные бонусы</li>
                  <li>Приоритетная поддержка</li>
                  <li>Персональный менеджер</li>
                </ul>
              </div>
              <div className="loyalty-level">
                <div className="level-icon">🥇</div>
                <h4>Золото</h4>
                <p>5000-9999 очков</p>
                <ul>
                  <li>Максимальные бонусы</li>
                  <li>VIP поддержка 24/7</li>
                  <li>Эксклюзивные акции</li>
                </ul>
              </div>
              <div className="loyalty-level">
                <div className="level-icon">💎</div>
                <h4>Платина</h4>
                <p>10000+ очков</p>
                <ul>
                  <li>Эксклюзивные бонусы</li>
                  <li>Персональные предложения</li>
                  <li>Индивидуальные условия</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Bonuses;
