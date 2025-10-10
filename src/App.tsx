import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Tournaments from './pages/Tournaments';
import Bonuses from './pages/Bonuses';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/bonuses" element={<Bonuses />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
