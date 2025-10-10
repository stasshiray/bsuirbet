import React from 'react';
import TournamentCard from '../components/TournamentCard';
import './Tournaments.css';

const Tournaments: React.FC = () => {
  const tournaments = [
    {
      id: 1,
      title: 'Mega Tournament',
      prize: '500,000 BYN',
      participants: 1250,
      maxParticipants: 2000,
      startDate: '2024-01-15',
      endDate: '2024-01-22',
      status: 'active',
      game: 'Book of Ra'
    },
    {
      id: 2,
      title: 'Weekly Slots Challenge',
      prize: '100,000 BYN',
      participants: 850,
      maxParticipants: 1000,
      startDate: '2024-01-20',
      endDate: '2024-01-27',
      status: 'upcoming',
      game: 'Gonzo\'s Quest'
    },
    {
      id: 3,
      title: 'Blackjack Masters',
      prize: '75,000 BYN',
      participants: 320,
      maxParticipants: 500,
      startDate: '2024-01-18',
      endDate: '2024-01-25',
      status: 'active',
      game: 'Blackjack Classic'
    },
    {
      id: 4,
      title: 'Roulette Royale',
      prize: '200,000 BYN',
      participants: 0,
      maxParticipants: 300,
      startDate: '2024-01-25',
      endDate: '2024-02-01',
      status: 'upcoming',
      game: 'European Roulette'
    }
  ];

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Активный';
      case 'upcoming': return 'Скоро';
      case 'finished': return 'Завершен';
      default: return status;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'active': return 'status-active';
      case 'upcoming': return 'status-upcoming';
      case 'finished': return 'status-finished';
      default: return '';
    }
  };

  return (
    <div className="tournaments">
      <section className="tournaments-hero">
        <div className="container">
          <h1 className="page-title">Турниры</h1>
          <p className="page-subtitle">
            Участвуйте в турнирах и выигрывайте крупные призы!
          </p>
        </div>
      </section>

      <section className="tournaments-content">
        <div className="container">
          <div className="tournaments-header">
            <h2>Активные турниры</h2>
            <div className="tournament-filters">
              <button className="filter-btn active">Все</button>
              <button className="filter-btn">Активные</button>
              <button className="filter-btn">Скоро</button>
            </div>
          </div>

          <div className="tournaments-grid">
            {tournaments.map(tournament => (
              <TournamentCard key={tournament.id} tournament={tournament} />
            ))}
          </div>

          <div className="tournament-rules">
            <h3>Правила турниров</h3>
            <div className="rules-grid">
              <div className="rule-item">
                <h4>🎯 Участие</h4>
                <p>Зарегистрируйтесь в турнире и играйте в указанную игру</p>
              </div>
              <div className="rule-item">
                <h4>🏆 Рейтинг</h4>
                <p>Зарабатывайте очки за каждую выигранную ставку</p>
              </div>
              <div className="rule-item">
                <h4>💰 Призы</h4>
                <p>Призовые места получают денежные награды</p>
              </div>
              <div className="rule-item">
                <h4>⏰ Время</h4>
                <p>Турниры проходят в ограниченное время</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tournaments;
