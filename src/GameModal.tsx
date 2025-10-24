import React, { useRef, useEffect, memo } from 'react';
import type { Game } from './api';
import { useLanguage } from './LanguageContext';
import Translate from './Translate';
import './GameModal.css';

interface GameModalProps {
  game: Game | null;
  isOpen: boolean;
  onClose: () => void;
}

const GameModal: React.FC<GameModalProps> = memo(({ game, isOpen, onClose }) => {
  const { t } = useLanguage();
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Handle escape key and click outside
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        modalRef.current &&
        !modalRef.current.contains(e.target as Node) &&
        overlayRef.current &&
        overlayRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Focus management
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      if (firstElement) {
        firstElement.focus();
      }
    }
  }, [isOpen]);

  if (!isOpen || !game) {
    return null;
  }

  return (
    <div className="game-modal-overlay" ref={overlayRef}>
      <div className="game-modal" ref={modalRef}>
        <div className="game-modal-header">
          <h2 className="game-modal-title">{game.title}</h2>
          <button
            className="game-modal-close"
            onClick={onClose}
            aria-label={t.close || 'Close modal'}
          >
            ×
          </button>
        </div>
        
        <div className="game-modal-content">
          <div className="game-modal-image">
            <img src={game.image} alt={game.title} />
            {game.isHot && <div className="hot-badge">HOT</div>}
            {game.category === 'Live Games' && <div className="live-indicator">LIVE</div>}
          </div>
          
          <div className="game-modal-info">
            <div className="game-modal-details">
              <div className="info-row">
                <span className="info-label">
                  <Translate id="category" />:
                </span>
                <span className="info-value">{game.category}</span>
              </div>
              <div className="info-row">
                <span className="info-label">
                  <Translate id="jackpot" />:
                </span>
                <span className="info-value jackpot-amount">{game.jackpot}</span>
              </div>
            </div>
            
            <div className="game-modal-actions">
              <button className="btn-primary btn-large">
                <Translate id="playNow" />
              </button>
              <button className="btn-secondary btn-large">
                <Translate id="learnMore" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

GameModal.displayName = 'GameModal';

export default GameModal;
