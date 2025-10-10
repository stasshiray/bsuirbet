import React, { useState, useEffect } from 'react';
import BonusCard from '../components/BonusCard';
import type { Bonus } from '../services/api';
import { fetchBonuses, claimBonus } from '../services/api';
import './Bonuses.css';

const Bonuses: React.FC = () => {
  const [bonuses, setBonuses] = useState<Bonus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBonuses = async () => {
      try {
        setLoading(true);
        const data = await fetchBonuses();
        setBonuses(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load bonuses');
      } finally {
        setLoading(false);
      }
    };

    loadBonuses();
  }, []);

  const handleClaimBonus = async (bonusId: number) => {
    try {
      await claimBonus(bonusId);
      alert('Бонус успешно получен!');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to claim bonus');
    }
  };

  if (loading) {
    return (
      <div className="bonuses">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h2>Загрузка бонусов...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bonuses">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h2>Ошибка загрузки</h2>
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Попробовать снова</button>
          </div>
        </div>
      </div>
    );
  }

  // Group bonuses by category
  const welcomeBonuses = bonuses.filter(bonus => bonus.category === 'welcome');
  const vipBonuses = bonuses.filter(bonus => bonus.category === 'vip');
  const dailyBonuses = bonuses.filter(bonus => bonus.category === 'daily');

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
          {/* Welcome Bonuses Section */}
          <div className="bonus-section">
            <div className="section-header">
              <h2 className="section-title">
                <span className="section-icon">🎁</span>
                Добро пожаловать
              </h2>
              <p className="section-description">Специальные бонусы для новых игроков</p>
            </div>
            <div className="bonuses-grid">
              {welcomeBonuses.map(bonus => (
                <BonusCard 
                  key={bonus.id} 
                  bonus={bonus} 
                  onClaim={() => handleClaimBonus(bonus.id)}
                />
              ))}
            </div>
          </div>

          {/* VIP Bonuses Section */}
          <div className="bonus-section">
            <div className="section-header">
              <h2 className="section-title">
                <span className="section-icon">👑</span>
                VIP Бонусы
              </h2>
              <p className="section-description">Эксклюзивные предложения для VIP игроков</p>
            </div>
            <div className="bonuses-grid">
              {vipBonuses.map(bonus => (
                <BonusCard 
                  key={bonus.id} 
                  bonus={bonus} 
                  onClaim={() => handleClaimBonus(bonus.id)}
                />
              ))}
            </div>
          </div>

          {/* Daily Bonuses Section */}
          <div className="bonus-section">
            <div className="section-header">
              <h2 className="section-title">
                <span className="section-icon">🎰</span>
                Ежедневные бонусы
              </h2>
              <p className="section-description">Регулярные награды для активных игроков</p>
            </div>
            <div className="bonuses-grid">
              {dailyBonuses.map(bonus => (
                <BonusCard 
                  key={bonus.id} 
                  bonus={bonus} 
                  onClaim={() => handleClaimBonus(bonus.id)}
                />
              ))}
            </div>
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
