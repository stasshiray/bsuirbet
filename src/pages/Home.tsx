import React from 'react';
import GameCard from '../components/GameCard';
import './Home.css';

const Home: React.FC = () => {
  const games = [
    {
      id: 1,
      title: 'Book of Ra',
      category: 'Слоты',
      image: '/api/placeholder/300/200',
      jackpot: '1,250,000 BYN',
      isHot: true
    },
    {
      id: 2,
      title: 'European Roulette',
      category: 'Рулетка',
      image: '/api/placeholder/300/200',
      jackpot: '850,000 BYN',
      isHot: false
    },
    {
      id: 3,
      title: 'Blackjack Classic',
      category: 'Блэкджек',
      image: '/api/placeholder/300/200',
      jackpot: '650,000 BYN',
      isHot: true
    },
    {
      id: 4,
      title: 'Mega Moolah',
      category: 'Слоты',
      image: '/api/placeholder/300/200',
      jackpot: '5,200,000 BYN',
      isHot: true
    },
    {
      id: 5,
      title: 'Texas Hold\'em',
      category: 'Покер',
      image: '/api/placeholder/300/200',
      jackpot: '320,000 BYN',
      isHot: false
    },
    {
      id: 6,
      title: 'Gonzo\'s Quest',
      category: 'Слоты',
      image: '/api/placeholder/300/200',
      jackpot: '980,000 BYN',
      isHot: true
    }
  ];

  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Добро пожаловать в <span className="gold-accent">BSUIRBet Casino</span>
            </h1>
            <p className="hero-subtitle">
              Лучшие онлайн казино игры, турниры и бонусы. Играйте и выигрывайте!
            </p>
            <div className="hero-actions">
              <button className="btn-primary btn-large">Начать игру</button>
              <button className="btn-secondary btn-large">Узнать больше</button>
            </div>
          </div>
        </div>
      </section>

      <section className="jackpot-section">
        <div className="container">
          <h2 className="section-title">Джекпоты</h2>
          <div className="jackpot-display">
            <div className="jackpot-item">
              <span className="jackpot-label">Mega Moolah</span>
              <span className="jackpot-amount">5,200,000 BYN</span>
            </div>
            <div className="jackpot-item">
              <span className="jackpot-label">Book of Ra</span>
              <span className="jackpot-amount">1,250,000 BYN</span>
            </div>
            <div className="jackpot-item">
              <span className="jackpot-label">Gonzo's Quest</span>
              <span className="jackpot-amount">980,000 BYN</span>
            </div>
          </div>
        </div>
      </section>

      <section className="games-section">
        <div className="container">
          <h2 className="section-title">Популярные игры</h2>
          <div className="games-grid">
            {games.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Почему выбирают нас</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎰</div>
              <h3>1000+ игр</h3>
              <p>Огромный выбор слотов, рулетки, покера и других игр</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3>Турниры</h3>
              <p>Ежедневные турниры с призовыми фондами</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Бонусы</h3>
              <p>Приветственные бонусы и еженедельные акции</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Безопасность</h3>
              <p>Лицензированная платформа с защитой данных</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
