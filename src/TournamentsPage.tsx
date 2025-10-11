import React, { useState, useEffect } from 'react';
import TournamentCard from './TournamentCard';
import type { Tournament } from './api';
import { fetchTournaments, participateInTournament } from './api';
import './TournamentsPage.css';

const Tournaments: React.FC = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTournaments = async () => {
      try {
        setLoading(true);
        const data = await fetchTournaments();
        setTournaments(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load tournaments');
      } finally {
        setLoading(false);
      }
    };

    loadTournaments();
  }, []);

  const handleParticipate = async (tournamentId: number) => {
    try {
      await participateInTournament(tournamentId);
      // Reload tournaments to get updated participant count
      const updatedTournaments = await fetchTournaments();
      setTournaments(updatedTournaments);
      alert('Вы успешно присоединились к турниру!');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to participate in tournament');
    }
  };

  if (loading) {
    return (
      <div className="tournaments">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h2>Загрузка турниров...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="tournaments">
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
              <TournamentCard 
                key={tournament.id} 
                tournament={tournament} 
                onParticipate={() => handleParticipate(tournament.id)}
              />
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
