import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import Button from "./Button";
import { useTheme } from "./ThemeContext";
import { useLanguage } from "./LanguageContext";
import { useAuth } from "./AuthContext";
import Translate from "./Translate";
import "./Header.css";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, loading } = useLanguage();
  const { user, logout, isAuthenticated } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <span className="logo-text">BSUIRBet</span>
            <span className="logo-subtitle">CASINO</span>
          </Link>

          <nav className={`nav ${isMenuOpen ? "nav-open" : ""}`}>
            <Link
              to="/"
              className={`nav-link ${isActive("/") ? "active" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Translate id="games" />
            </Link>
            <Link
              to="/tournaments"
              className={`nav-link ${isActive("/tournaments") ? "active" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Translate id="tournaments" />
            </Link>
            <Link
              to="/bonuses"
              className={`nav-link ${isActive("/bonuses") ? "active" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Translate id="bonuses" />
            </Link>
          </nav>

          <div className="header-actions">
            <div className="language-selector">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as "ru" | "en")}
                className="language-select"
                disabled={loading}
              >
                <option value="ru">
                  🇷🇺 <Translate id="russian" />
                </option>
                <option value="en">
                  🇺🇸 <Translate id="english" />
                </option>
              </select>
              {loading && <span className="loading-indicator">⟳</span>}
            </div>

            <button
              className="theme-toggle"
              onClick={toggleTheme}
              title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            {isAuthenticated && user ? (
              <div className="user-info">
                <div className="user-menu">
                  <span className="user-name">
                    {user.profile?.name || user.profile?.preferred_username || user.profile?.email || 'User'}
                  </span>
                  <Button
                    variant="secondary"
                    size="small"
                    onClick={handleLogout}
                  >
                    <Translate id="logout" />
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <Button
                  variant="secondary"
                  size="small"
                  onClick={() => navigate("/login")}
                >
                  <Translate id="login" />
                </Button>
                <Button
                  variant="primary"
                  size="small"
                  onClick={() => navigate("/signup")}
                >
                  <Translate id="register" />
                </Button>
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
