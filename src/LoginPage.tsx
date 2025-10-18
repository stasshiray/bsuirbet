import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login, type LoginRequest } from './api';
import Button from './Button';
import { useLanguage } from './LanguageContext';
import './LoginPage.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [formData, setFormData] = useState<LoginRequest>({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await login(formData);
      if (response.success) {
        // Store token in localStorage
        localStorage.setItem('token', response.token || '');
        localStorage.setItem('user', JSON.stringify(response.user));
        navigate('/');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1 className="auth-title">{t.loginTitle}</h1>
          <p className="auth-subtitle">{t.loginSubtitle}</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email" className="form-label">{t.email}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder={t.email}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">{t.password}</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              placeholder={t.password}
              required
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={loading}
          >
            {t.login}
          </Button>

          <div className="auth-links">
            <p>{t.noAccount} <Link to="/signup" className="auth-link">{t.createAccount}</Link></p>
          </div>

          <div className="demo-credentials">
            <h3>{t.demoCredentials}:</h3>
            <div className="demo-account">
              {t.demoAccount1}
            </div>
            <div className="demo-account">
              {t.demoAccount2}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
