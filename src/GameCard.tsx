import React, { useRef, useState, memo } from "react";
import type { Game, Provider } from "./api";
import Button from "./Button";
import Translate from "./Translate";
import "./GameCard.css";

interface GameCardProps {
  game: Game;
  providersMap: Record<string, Provider>;
  onPlayGame?: (game: Game) => void;
}

const GameCard: React.FC<GameCardProps> = memo(({ game, providersMap, onPlayGame }) => {
  const provider = providersMap[game.providerId];

  // useRef for game card hover effects and animations
  const cardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (cardRef.current) {
      cardRef.current.style.transform = "translateY(-8px) scale(1.02)";
    }
    if (overlayRef.current) {
      overlayRef.current.style.opacity = "1";
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transform = "translateY(0) scale(1)";
    }
    if (overlayRef.current) {
      overlayRef.current.style.opacity = "0";
    }
  };

  return (
    <div
      ref={cardRef}
      className="game-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: "pointer",
      }}
    >
      <div
        className="game-image"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <img
          src={game.image}
          alt={game.title}
          style={{
            transition: "transform 0.3s ease",
            transform: isHovered ? "scale(1.1)" : "scale(1)",
          }}
        />
        {game.isHot && <div className="hot-badge">HOT</div>}
        {game.category === "Live Games" && (
          <div className="live-indicator">LIVE</div>
        )}
         <div ref={overlayRef} className="game-overlay">
           <Button 
             variant="primary" 
             size="small"
             onClick={() => onPlayGame?.(game)}
           >
             <Translate id="playGame" />
           </Button>
         </div>
      </div>
      <div className="game-info">
        <h3 className="game-title">{game.title}</h3>
        <p className="game-category">{game.category}</p>
        <div className="game-provider">
          <span className="provider-label">
            <Translate id="provider" />:
          </span>
          <span className="provider-name">
            {provider?.name || game.providerId}
          </span>
        </div>
        <div className="game-jackpot">
          <span className="jackpot-label">
            <Translate id="jackpot" />:
          </span>
          <span className="jackpot-amount">{game.jackpot}</span>
        </div>
      </div>
    </div>
  );
});

GameCard.displayName = 'GameCard';

export default GameCard;
