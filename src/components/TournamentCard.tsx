import React from 'react';
import './TournamentCard.css';

interface Tournament {
  id: number;
  title: string;
  prize: string;
  participants: number;
  maxParticipants: number;
  startDate: string;
  endDate: string;
  status: string;
  game: string;
}

interface TournamentCardProps {
  tournament: Tournament;
}

const TournamentCard: React.FC<TournamentCardProps> = ({ tournament }) => {
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

  const participationPercentage = (tournament.participants / tournament.maxParticipants) * 100;

  return (
    <div className="tournament-card">
      <div className="tournament-header">
        <h3 className="tournament-title">{tournament.title}</h3>
        <span className={`tournament-status ${getStatusClass(tournament.status)}`}>
          {getStatusText(tournament.status)}
        </span>
      </div>

      <div className="tournament-prize">
        <span className="prize-label">Призовой фонд:</span>
        <span className="prize-amount">{tournament.prize}</span>
      </div>

      <div className="tournament-game">
        <span className="game-label">Игра:</span>
        <span className="game-name">{tournament.game}</span>
      </div>

      <div className="tournament-participants">
        <div className="participants-info">
          <span className="participants-count">
            {tournament.participants} / {tournament.maxParticipants}
          </span>
          <span className="participants-label">участников</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${participationPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="tournament-dates">
        <div className="date-item">
          <span className="date-label">Начало:</span>
          <span className="date-value">{tournament.startDate}</span>
        </div>
        <div className="date-item">
          <span className="date-label">Окончание:</span>
          <span className="date-value">{tournament.endDate}</span>
        </div>
      </div>

      <div className="tournament-actions">
        <button className="btn-primary">Участвовать</button>
        <button className="btn-secondary">Подробнее</button>
      </div>
    </div>
  );
};

export default TournamentCard;
