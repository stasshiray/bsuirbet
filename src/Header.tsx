import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import type { User } from './api';
import './Header.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

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
            {user ? (
              <div className="user-info">
                <div className="user-balance">
                  <span className="balance-label">Баланс:</span>
                  <span className="balance-amount">{user.balance} BYN</span>
                </div>
                <div className="user-menu">
                  <span className="user-name">{user.firstName} {user.lastName}</span>
                  <button className="btn-logout" onClick={handleLogout}>
                    Выйти
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn-login">Войти</Link>
                <Link to="/signup" className="btn-register btn-primary">Регистрация</Link>
              </>
            )}
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
