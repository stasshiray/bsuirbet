import React, { useState } from 'react';
import { Link } from 'react-router';
import { useAuth } from './AuthContext';
import Button from './Button';
import { useLanguage } from './LanguageContext';
import './LoginPage.css';

const Login: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleKeycloakLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      await login();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return (
      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-header">
            <h1 className="auth-title">Already Logged In</h1>
            <p className="auth-subtitle">You are already authenticated</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1 className="auth-title">{t.loginTitle}</h1>
          <p className="auth-subtitle">{t.loginSubtitle}</p>
        </div>

        <div className="auth-form">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <Button
            type="button"
            variant="primary"
            fullWidth
            loading={loading}
            onClick={handleKeycloakLogin}
          >
            {t.login} with Keycloak
          </Button>

          <div className="auth-links">
            <p>{t.noAccount} <Link to="/signup" className="auth-link">{t.createAccount}</Link></p>
          </div>

          <div className="demo-credentials">
            <h3>Test Credentials:</h3>
            <div className="demo-account">
              Username: test
            </div>
            <div className="demo-account">
              Password: test
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
