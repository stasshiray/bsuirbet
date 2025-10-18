import React, { useState, useEffect } from 'react';
import TournamentCard from './TournamentCard';
import type { Tournament } from './api';
import { fetchTournaments, participateInTournament } from './api';
import { useLanguage } from './LanguageContext';
import './TournamentsPage.css';

const Tournaments: React.FC = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguage();

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
      alert(t.tournamentJoined || 'Successfully joined tournament!');
    } catch (err) {
      alert(err instanceof Error ? err.message : t.tournamentJoinFailed || 'Failed to join tournament');
    }
  };

  if (loading) {
    return (
      <div className="tournaments">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h2>{t.loadingTournaments || 'Loading tournaments...'}</h2>
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
            <h2>{t.error}</h2>
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>{t.tryAgain}</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tournaments">
      <section className="tournaments-hero">
        <div className="container">
          <h1 className="page-title">{t.tournamentsTitle}</h1>
          <p className="page-subtitle">
            {t.tournamentsSubtitle}
          </p>
        </div>
      </section>

      <section className="tournaments-content">
        <div className="container">
          <div className="tournaments-header">
            <h2>{t.activeTournaments}</h2>
            <div className="tournament-filters">
              <button className="filter-btn active">{t.all}</button>
              <button className="filter-btn">{t.active || 'Active'}</button>
              <button className="filter-btn">{t.upcoming || 'Upcoming'}</button>
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
            <h3>{t.tournamentRules || 'Tournament Rules'}</h3>
            <div className="rules-grid">
              <div className="rule-item">
                <h4>🎯 {t.participation || 'Participation'}</h4>
                <p>{t.participationDesc || 'Register for the tournament and play the specified game'}</p>
              </div>
              <div className="rule-item">
                <h4>🏆 {t.ranking || 'Ranking'}</h4>
                <p>{t.rankingDesc || 'Earn points for every winning bet'}</p>
              </div>
              <div className="rule-item">
                <h4>💰 {t.prizes || 'Prizes'}</h4>
                <p>{t.prizesDesc || 'Prize places receive monetary rewards'}</p>
              </div>
              <div className="rule-item">
                <h4>⏰ {t.time || 'Time'}</h4>
                <p>{t.timeDesc || 'Tournaments run for a limited time'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tournaments;
