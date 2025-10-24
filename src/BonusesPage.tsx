import React, { useCallback } from "react";
import BonusCard from "./BonusCard";
import type { Bonus } from "./bonuses";
import { fetchBonuses, claimBonus } from "./api";
import { useLanguage } from "./LanguageContext";
import useFetch from "./useFetch";
import "./BonusesPage.css";

const Bonuses: React.FC = () => {
  const { t } = useLanguage();

  const {
    data: bonuses,
    loading,
    error,
    fetchData,
  } = useFetch<Bonus[]>(fetchBonuses, {
    immediate: true,
  });

  const handleClaimBonus = useCallback(
    async (bonusId: number) => {
      try {
        await claimBonus(bonusId);
        alert(t.bonusClaimed);
      } catch (err) {
        alert(err instanceof Error ? err.message : t.bonusClaimFailed);
      }
    },
    [t]
  );

  if (loading) {
    return (
      <div className="bonuses">
        <div className="container">
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <h2>{t.loadingBonuses}</h2>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bonuses">
        <div className="container">
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <h2>{t.error}</h2>
            <p>{error}</p>
            <div
              style={{ display: "flex", gap: "1rem", justifyContent: "center" }}
            >
              <button onClick={fetchData}>{t.tryAgain}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Group bonuses by category
  const welcomeBonuses =
    bonuses?.filter((bonus) => bonus.category === "welcome") || [];
  const vipBonuses = bonuses?.filter((bonus) => bonus.category === "vip") || [];
  const dailyBonuses =
    bonuses?.filter((bonus) => bonus.category === "daily") || [];

  return (
    <div className="bonuses">
      <section className="bonuses-hero">
        <div className="container">
          <h1 className="page-title">{t.bonusesTitle}</h1>
          <p className="page-subtitle">{t.bonusesSubtitle}</p>
        </div>
      </section>

      <section className="bonuses-content">
        <div className="container">
          {/* Welcome Bonuses Section */}
          <div className="bonus-section">
            <div className="section-header">
              <h2 className="section-title">
                <span className="section-icon">🎁</span>
                {t.welcomeBonuses}
              </h2>
              <p className="section-description">{t.welcomeBonusesDesc}</p>
            </div>
            <div className="bonuses-grid">
              {welcomeBonuses.map((bonus) => (
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
                {t.vipBonuses}
              </h2>
              <p className="section-description">{t.vipBonusesDesc}</p>
            </div>
            <div className="bonuses-grid">
              {vipBonuses.map((bonus) => (
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
                {t.dailyBonuses}
              </h2>
              <p className="section-description">{t.dailyBonusesDesc}</p>
            </div>
            <div className="bonuses-grid">
              {dailyBonuses.map((bonus) => (
                <BonusCard
                  key={bonus.id}
                  bonus={bonus}
                  onClaim={() => handleClaimBonus(bonus.id)}
                />
              ))}
            </div>
          </div>

          <div className="bonus-terms">
            <h3>{t.bonusTerms}</h3>
            <div className="terms-grid">
              <div className="term-item">
                <h4>🎯 {t.wagering}</h4>
                <p>{t.wageringDesc}</p>
              </div>
              <div className="term-item">
                <h4>⏰ {t.validity}</h4>
                <p>{t.validityDesc}</p>
              </div>
              <div className="term-item">
                <h4>🎮 {t.games}</h4>
                <p>{t.gamesDesc}</p>
              </div>
              <div className="term-item">
                <h4>📋 {t.rules}</h4>
                <p>{t.rulesDesc}</p>
              </div>
            </div>
          </div>

          <div className="loyalty-program">
            <h3>{t.loyaltyProgram}</h3>
            <div className="loyalty-levels">
              <div className="loyalty-level">
                <div className="level-icon">🥉</div>
                <h4>{t.bronze}</h4>
                <p>{t.bronzePoints}</p>
                <ul>
                  <li>{t.basicBonuses}</li>
                  <li>{t.standardSupport}</li>
                </ul>
              </div>
              <div className="loyalty-level">
                <div className="level-icon">🥈</div>
                <h4>{t.silver}</h4>
                <p>{t.silverPoints}</p>
                <ul>
                  <li>{t.increasedBonuses}</li>
                  <li>{t.prioritySupport}</li>
                  <li>{t.personalManager}</li>
                </ul>
              </div>
              <div className="loyalty-level">
                <div className="level-icon">🥇</div>
                <h4>{t.gold}</h4>
                <p>{t.goldPoints}</p>
                <ul>
                  <li>{t.maximumBonuses}</li>
                  <li>{t.vipSupport}</li>
                  <li>{t.exclusiveOffers}</li>
                </ul>
              </div>
              <div className="loyalty-level">
                <div className="level-icon">💎</div>
                <h4>{t.platinum}</h4>
                <p>{t.platinumPoints}</p>
                <ul>
                  <li>{t.exclusiveBonuses}</li>
                  <li>{t.personalOffers}</li>
                  <li>{t.individualTerms}</li>
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
