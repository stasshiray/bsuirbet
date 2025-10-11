import React from 'react';
import type { Game, Provider } from '../services/api';
import './GameCard.css';

interface GameCardProps {
  game: Game;
  providersMap: Record<string, Provider>;
}

const GameCard: React.FC<GameCardProps> = ({ game, providersMap }) => {
  const provider = providersMap[game.providerId];
  
  return (
    <div className="game-card">
      <div className="game-image">
        <img src={game.image} alt={game.title} />
        {game.isHot && <div className="hot-badge">HOT</div>}
        <div className="game-overlay">
          <button className="play-button">Играть</button>
        </div>
      </div>
      <div className="game-info">
        <h3 className="game-title">{game.title}</h3>
        <p className="game-category">{game.category}</p>
        <div className="game-provider">
          <span className="provider-label">Провайдер:</span>
          <span className="provider-name">{provider?.name || game.providerId}</span>
        </div>
        <div className="game-jackpot">
          <span className="jackpot-label">Джекпот:</span>
          <span className="jackpot-amount">{game.jackpot}</span>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
