import React, { useState, useEffect } from 'react';
import GameCard from '../components/GameCard';
import type { Game, Jackpot } from '../services/api';
import { fetchGames, fetchJackpots } from '../services/api';
import './Home.css';

const Home: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [jackpots, setJackpots] = useState<Jackpot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [gamesData, jackpotsData] = await Promise.all([
          fetchGames(),
          fetchJackpots()
        ]);
        setGames(gamesData);
        setJackpots(jackpotsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="home">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h2>Загрузка...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home">
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

  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Добро пожаловать в <span className="fonbet-orange">BSUIRBet Casino</span>
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
            {jackpots.slice(0, 3).map((jackpot, index) => (
              <div key={index} className="jackpot-item">
                <span className="jackpot-label">{jackpot.game}</span>
                <span className="jackpot-amount">{jackpot.amount}</span>
              </div>
            ))}
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
