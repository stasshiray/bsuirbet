import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup, type SignupRequest } from './api';
import Button from './Button';
import { useLanguage } from './LanguageContext';
import './SignupPage.css';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [formData, setFormData] = useState<SignupRequest>({
    email: '',
    password: '',
    username: '',
    firstName: '',
    lastName: ''
  });
  const [confirmPassword, setConfirmPassword] = useState('');
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

    // Validate passwords match
    if (formData.password !== confirmPassword) {
      setError('Пароли не совпадают');
      setLoading(false);
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      setLoading(false);
      return;
    }

    try {
      const response = await signup(formData);
      if (response.success) {
        // Store token in localStorage
        localStorage.setItem('token', response.token || '');
        localStorage.setItem('user', JSON.stringify(response.user));
        navigate('/');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Регистрация не удалась');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1 className="auth-title">{t.signupTitle}</h1>
          <p className="auth-subtitle">{t.signupSubtitle}</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName" className="form-label">{t.firstName}</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="form-input"
                placeholder={t.firstName}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName" className="form-label">{t.lastName}</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="form-input"
                placeholder={t.lastName}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="username" className="form-label">{t.username || 'Username'}</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="form-input"
              placeholder={t.username || 'Username'}
              required
            />
          </div>

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

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">{t.confirmPassword}</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-input"
              placeholder={t.confirmPassword}
              required
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={loading}
          >
            {t.register}
          </Button>

          <div className="auth-links">
            <p>{t.haveAccount} <Link to="/login" className="auth-link">{t.signIn}</Link></p>
          </div>

          <div className="welcome-bonus">
            <div className="bonus-icon">🎁</div>
            <div className="bonus-text">
              {t.welcomeBonus}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
