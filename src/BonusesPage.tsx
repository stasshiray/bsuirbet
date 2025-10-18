import React, { useState, useEffect } from 'react';
import BonusCard from './BonusCard';
import type { Bonus } from './bonuses';
import { fetchBonuses, claimBonus } from './api';
import { useLanguage } from './LanguageContext';
import './BonusesPage.css';

const Bonuses: React.FC = () => {
  const [bonuses, setBonuses] = useState<Bonus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const loadBonuses = async () => {
      try {
        setLoading(true);
        const data = await fetchBonuses();
        setBonuses(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load bonuses');
      } finally {
        setLoading(false);
      }
    };

    loadBonuses();
  }, []);

  const handleClaimBonus = async (bonusId: number) => {
    try {
      await claimBonus(bonusId);
      alert(t.bonusClaimed || 'Bonus successfully claimed!');
    } catch (err) {
      alert(err instanceof Error ? err.message : t.bonusClaimFailed || 'Failed to claim bonus');
    }
  };

  if (loading) {
    return (
      <div className="bonuses">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h2>{t.loadingBonuses || 'Loading bonuses...'}</h2>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bonuses">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h2>{t.error}</h2>
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>{t.tryAgain}</button>
          </div>
        </div>
      </div>
    );
  }

  // Group bonuses by category
  const welcomeBonuses = bonuses.filter(bonus => bonus.category === 'welcome');
  const vipBonuses = bonuses.filter(bonus => bonus.category === 'vip');
  const dailyBonuses = bonuses.filter(bonus => bonus.category === 'daily');

  return (
    <div className="bonuses">
      <section className="bonuses-hero">
        <div className="container">
          <h1 className="page-title">{t.bonusesTitle}</h1>
          <p className="page-subtitle">
            {t.bonusesSubtitle}
          </p>
        </div>
      </section>

      <section className="bonuses-content">
        <div className="container">
          {/* Welcome Bonuses Section */}
          <div className="bonus-section">
            <div className="section-header">
              <h2 className="section-title">
                <span className="section-icon">🎁</span>
                {t.welcomeBonuses || 'Welcome Bonuses'}
              </h2>
              <p className="section-description">{t.welcomeBonusesDesc || 'Special bonuses for new players'}</p>
            </div>
            <div className="bonuses-grid">
              {welcomeBonuses.map(bonus => (
                <BonusCard 
                  key={bonus.id} 
                  bonus={bonus} 
                  onClaim={() => handleClaimBonus(bonus.id)}
                />
              ))}
            </div>
          </div>

          {/* VIP Bonuses Section */}
          <div className="bonus-section">
            <div className="section-header">
              <h2 className="section-title">
                <span className="section-icon">👑</span>
                {t.vipBonuses || 'VIP Bonuses'}
              </h2>
              <p className="section-description">{t.vipBonusesDesc || 'Exclusive offers for VIP players'}</p>
            </div>
            <div className="bonuses-grid">
              {vipBonuses.map(bonus => (
                <BonusCard 
                  key={bonus.id} 
                  bonus={bonus} 
                  onClaim={() => handleClaimBonus(bonus.id)}
                />
              ))}
            </div>
          </div>

          {/* Daily Bonuses Section */}
          <div className="bonus-section">
            <div className="section-header">
              <h2 className="section-title">
                <span className="section-icon">🎰</span>
                {t.dailyBonuses || 'Daily Bonuses'}
              </h2>
              <p className="section-description">{t.dailyBonusesDesc || 'Regular rewards for active players'}</p>
            </div>
            <div className="bonuses-grid">
              {dailyBonuses.map(bonus => (
                <BonusCard 
                  key={bonus.id} 
                  bonus={bonus} 
                  onClaim={() => handleClaimBonus(bonus.id)}
                />
              ))}
            </div>
          </div>

          <div className="bonus-terms">
            <h3>{t.bonusTerms || 'Bonus Terms'}</h3>
            <div className="terms-grid">
              <div className="term-item">
                <h4>🎯 {t.wagering || 'Wagering'}</h4>
                <p>{t.wageringDesc || 'All bonuses have wagering requirements'}</p>
              </div>
              <div className="term-item">
                <h4>⏰ {t.validity || 'Validity'}</h4>
                <p>{t.validityDesc || 'Bonuses are valid for a limited time'}</p>
              </div>
              <div className="term-item">
                <h4>🎮 {t.games || 'Games'}</h4>
                <p>{t.gamesDesc || 'Some games may not count towards wagering'}</p>
              </div>
              <div className="term-item">
                <h4>📋 {t.rules || 'Rules'}</h4>
                <p>{t.rulesDesc || 'Follow casino rules to receive bonuses'}</p>
              </div>
            </div>
          </div>

          <div className="loyalty-program">
            <h3>{t.loyaltyProgram || 'Loyalty Program'}</h3>
            <div className="loyalty-levels">
              <div className="loyalty-level">
                <div className="level-icon">🥉</div>
                <h4>{t.bronze || 'Bronze'}</h4>
                <p>{t.bronzePoints || '0-999 points'}</p>
                <ul>
                  <li>{t.basicBonuses || 'Basic bonuses'}</li>
                  <li>{t.standardSupport || 'Standard support'}</li>
                </ul>
              </div>
              <div className="loyalty-level">
                <div className="level-icon">🥈</div>
                <h4>{t.silver || 'Silver'}</h4>
                <p>{t.silverPoints || '1000-4999 points'}</p>
                <ul>
                  <li>{t.increasedBonuses || 'Increased bonuses'}</li>
                  <li>{t.prioritySupport || 'Priority support'}</li>
                  <li>{t.personalManager || 'Personal manager'}</li>
                </ul>
              </div>
              <div className="loyalty-level">
                <div className="level-icon">🥇</div>
                <h4>{t.gold || 'Gold'}</h4>
                <p>{t.goldPoints || '5000-9999 points'}</p>
                <ul>
                  <li>{t.maximumBonuses || 'Maximum bonuses'}</li>
                  <li>{t.vipSupport || 'VIP support 24/7'}</li>
                  <li>{t.exclusiveOffers || 'Exclusive offers'}</li>
                </ul>
              </div>
              <div className="loyalty-level">
                <div className="level-icon">💎</div>
                <h4>{t.platinum || 'Platinum'}</h4>
                <p>{t.platinumPoints || '10000+ points'}</p>
                <ul>
                  <li>{t.exclusiveBonuses || 'Exclusive bonuses'}</li>
                  <li>{t.personalOffers || 'Personal offers'}</li>
                  <li>{t.individualTerms || 'Individual terms'}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Bonuses;
