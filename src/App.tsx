import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { Suspense, lazy } from 'react';
import Layout from './Layout';
import Home from './HomePage';
import Tournaments from './TournamentsPage';
import Login from './LoginPage';
import Signup from './SignupPage';
import OnlineStatus from './OnlineStatus';
import LoadingSpinner from './LoadingSpinner';
import { ThemeProvider } from './ThemeContext';
import { LanguageProvider } from './LanguageContext';
import './App.css';

// Lazy load the BonusesPage component
const Bonuses = lazy(() => import('./BonusesPage'));

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
                  <Route path="/bonuses" element={
                    <Suspense fallback={<LoadingSpinner message="Loading bonuses..." size="large" />}>
                      <Bonuses />
                    </Suspense>
                  } />
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
