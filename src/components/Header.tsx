import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <span className="logo-text">BSUIRBet</span>
            <span className="logo-subtitle">CASINO</span>
          </Link>

          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Игры
            </Link>
            <Link 
              to="/tournaments" 
              className={`nav-link ${isActive('/tournaments') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Турниры
            </Link>
            <Link 
              to="/bonuses" 
              className={`nav-link ${isActive('/bonuses') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Бонусы
            </Link>
          </nav>

          <div className="header-actions">
            <button className="btn-login">Войти</button>
            <button className="btn-register btn-primary">Регистрация</button>
            <button 
              className="menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
