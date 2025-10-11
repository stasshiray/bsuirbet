import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup, type SignupRequest } from './api';
import './SignupPage.css';

const Signup: React.FC = () => {
  const navigate = useNavigate();
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
          <h1 className="auth-title">Регистрация в BSUIRBet</h1>
          <p className="auth-subtitle">Создайте свой аккаунт и получите бонус!</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName" className="form-label">Имя</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="form-input"
                placeholder="Ваше имя"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName" className="form-label">Фамилия</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="form-input"
                placeholder="Ваша фамилия"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="username" className="form-label">Имя пользователя</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="form-input"
              placeholder="Выберите имя пользователя"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="Введите ваш email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Пароль</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              placeholder="Минимум 6 символов"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">Подтвердите пароль</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-input"
              placeholder="Повторите пароль"
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary btn-full"
            disabled={loading}
          >
            {loading ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>

          <div className="auth-links">
            <p>Уже есть аккаунт? <Link to="/login" className="auth-link">Войти</Link></p>
          </div>

          <div className="welcome-bonus">
            <div className="bonus-icon">🎁</div>
            <div className="bonus-text">
              <strong>Добро пожаловать!</strong><br />
              Получите 100 BYN бонус при регистрации
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
