import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login, type LoginRequest } from './api';
import Button from './Button';
import './LoginPage.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
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
          <h1 className="auth-title">Вход в BSUIRBet</h1>
          <p className="auth-subtitle">Добро пожаловать обратно!</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

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
              placeholder="Введите ваш пароль"
              required
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={loading}
          >
            Войти
          </Button>

          <div className="auth-links">
            <p>Нет аккаунта? <Link to="/signup" className="auth-link">Зарегистрироваться</Link></p>
          </div>

          <div className="demo-credentials">
            <h3>Демо аккаунты:</h3>
            <div className="demo-account">
              <strong>Админ:</strong> admin@bsuirbet.com / admin123
            </div>
            <div className="demo-account">
              <strong>Игрок:</strong> player@bsuirbet.com / player123
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
