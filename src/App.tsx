import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './HomePage';
import Tournaments from './TournamentsPage';
import Bonuses from './BonusesPage';
import Login from './LoginPage';
import Signup from './SignupPage';
import OnlineStatus from './OnlineStatus';
import { ThemeProvider } from './ThemeContext';
import { LanguageProvider } from './LanguageContext';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <Router>
          <OnlineStatus />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/*" element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/tournaments" element={<Tournaments />} />
                  <Route path="/bonuses" element={<Bonuses />} />
                </Routes>
              </Layout>
            } />
          </Routes>
        </Router>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
