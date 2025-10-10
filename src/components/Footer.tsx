import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>BSUIRBet Casino</h3>
            <p>Лучшие онлайн казино игры и турниры</p>
          </div>
          
          <div className="footer-section">
            <h4>Игры</h4>
            <ul>
              <li><a href="#">Слоты</a></li>
              <li><a href="#">Рулетка</a></li>
              <li><a href="#">Блэкджек</a></li>
              <li><a href="#">Покер</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Поддержка</h4>
            <ul>
              <li><a href="#">Помощь</a></li>
              <li><a href="#">Контакты</a></li>
              <li><a href="#">Правила</a></li>
              <li><a href="#">Безопасность</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Связь</h4>
            <p>Email: support@bsuirbet.by</p>
            <p>Телефон: +375 29 123-45-67</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 BSUIRBet Casino. Все права защищены.</p>
          <p>Играйте ответственно. 18+</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
