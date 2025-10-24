import React, { useState, useEffect, useMemo, useRef } from "react";
import GameCard from "./GameCard";
import GameModal from "./GameModal";
import type { Game, Jackpot, Provider } from "./api";
import {
  fetchGames,
  fetchJackpots,
  fetchProviders,
  fetchCategories,
} from "./api";
import { useLanguage } from "./LanguageContext";
import Translate from "./Translate";
import "./HomePage.css";

type GamesLookup = {
  [key: number]: Game;
};

type ProvidersLookup = {
  [key: string]: Provider;
};

const createGamesLookup = (games: Game[]): GamesLookup => {
  const lookup: GamesLookup = {};
  games.forEach((game) => {
    lookup[game.id] = game;
  });
  return lookup;
};

const createProvidersLookup = (providers: Provider[]): ProvidersLookup => {
  const lookup: Record<string, Provider> = {};
  providers.forEach((provider) => {
    lookup[provider.id] = provider;
  });
  return lookup;
};

const Home: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [jackpots, setJackpots] = useState<Jackpot[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [gamesRelatedDataLoading, setGamesRelatedDataLoading] = useState(true);
  const [gamesLoading, setGamesLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { loading: translationsLoading } = useLanguage();

  // Modal state
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // useRef for auto-scrolling jackpot display
  const jackpotScrollRef = useRef<HTMLDivElement>(null);
  const jackpotScrollIntervalRef = useRef<number | null>(null);

  // Create optimized lookup object for faster searching
  const gamesMap = useMemo(() => createGamesLookup(games), [games]);

  // Create providers lookup map
  const providersMap = useMemo(
    () => createProvidersLookup(providers),
    [providers]
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        setGamesRelatedDataLoading(true);
        const [jackpotsData, providersData, categoriesData] = await Promise.all(
          [fetchJackpots(), fetchProviders(), fetchCategories()]
        );
        setJackpots(jackpotsData);
        setProviders(providersData);
        setCategories(categoriesData.categories);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setGamesRelatedDataLoading(false);
      }
    };

    loadData();
  }, []);

  // Load games when selected categories change
  useEffect(() => {
    const loadFilteredGames = async () => {
      try {
        setGamesLoading(true);
        const gamesData = await fetchGames(
          selectedCategories.length > 0 ? selectedCategories : undefined
        );
        setGames(gamesData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load filtered games"
        );
      } finally {
        setGamesLoading(false);
      }
    };

    loadFilteredGames();
  }, [selectedCategories]);

  // Auto-scroll jackpot display
  useEffect(() => {
    if (jackpots.length > 0) {
      const startAutoScroll = () => {
        if (jackpotScrollIntervalRef.current) {
          clearInterval(jackpotScrollIntervalRef.current);
        }

        jackpotScrollIntervalRef.current = setInterval(() => {
          if (jackpotScrollRef.current) {
            const container = jackpotScrollRef.current;
            const scrollAmount = 1;
            container.scrollLeft += scrollAmount;

            // Reset scroll when reaching the end
            if (
              container.scrollLeft >=
              container.scrollWidth - container.clientWidth
            ) {
              container.scrollLeft = 0;
            }
          }
        }, 50); // Scroll every 50ms for smooth animation
      };

      startAutoScroll();
    }

    return () => {
      if (jackpotScrollIntervalRef.current) {
        clearInterval(jackpotScrollIntervalRef.current);
      }
    };
  }, [jackpots]);

  // Modal handlers
  const handlePlayGame = (game: Game) => {
    setSelectedGame(game);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGame(null);
  };

  if (gamesRelatedDataLoading || gamesLoading || translationsLoading) {
    return (
      <div className="home">
        <div className="container">
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <h2>
              <Translate id="loading" />
            </h2>
            {translationsLoading && <p>Loading translations...</p>}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home">
        <div className="container">
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <h2>
              <Translate id="error" />
            </h2>
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>
              <Translate id="tryAgain" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              <Translate id="welcomeTitle" />{" "}
              <span className="fonbet-orange">BSUIRBet Casino</span>
            </h1>
            <p className="hero-subtitle">
              <Translate id="welcomeSubtitle" />
            </p>
            <div className="hero-actions">
              <button className="btn-primary btn-large">
                <Translate id="playNow" />
              </button>
              <button className="btn-secondary btn-large">
                <Translate id="learnMore" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="jackpot-section">
        <div className="container">
          <h2 className="section-title">
            <Translate id="jackpotTitle" />
          </h2>
          <div
            ref={jackpotScrollRef}
            className="jackpot-display"
            onMouseEnter={() => {
              if (jackpotScrollIntervalRef.current) {
                clearInterval(jackpotScrollIntervalRef.current);
              }
            }}
            onMouseLeave={() => {
              if (jackpots.length > 0) {
                jackpotScrollIntervalRef.current = setInterval(() => {
                  if (jackpotScrollRef.current) {
                    const container = jackpotScrollRef.current;
                    const scrollAmount = 1;
                    container.scrollLeft += scrollAmount;

                    if (
                      container.scrollLeft >=
                      container.scrollWidth - container.clientWidth
                    ) {
                      container.scrollLeft = 0;
                    }
                  }
                }, 50);
              }
            }}
          >
            {jackpots.slice(0, 10).map((jackpot, index) => {
              const game = gamesMap[jackpot.gameId];
              return (
                <div
                  key={index}
                  className="jackpot-item"
                  style={{ display: "inline-block", marginRight: "2rem" }}
                >
                  <span className="jackpot-label">
                    {game?.title || `Game ${jackpot.gameId}`}
                  </span>
                  <span className="jackpot-amount">{jackpot.amount}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="games-section">
        <div className="container">
          <div className="games-header">
            <h2 className="section-title">
              <Translate id="popularGames" />
            </h2>
            <div className="category-filters">
              <button
                className={`filter-btn ${
                  selectedCategories.length === 0 ? "active" : ""
                }`}
                onClick={() => setSelectedCategories([])}
              >
                <Translate id="all" />
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  className={`filter-btn ${
                    selectedCategories.includes(category) ? "active" : ""
                  }`}
                  onClick={() => {
                    if (selectedCategories.includes(category)) {
                      setSelectedCategories(
                        selectedCategories.filter((c) => c !== category)
                      );
                    } else {
                      setSelectedCategories([...selectedCategories, category]);
                    }
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div className="games-grid">
            {games.map((game) => (
              <GameCard 
                key={game.id} 
                game={game} 
                providersMap={providersMap}
                onPlayGame={handlePlayGame}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2 className="section-title">
            <Translate id="featuresTitle" />
          </h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎰</div>
              <h3>
                <Translate id="secureGaming" />
              </h3>
              <p>
                <Translate id="secureGamingDesc" />
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3>
                <Translate id="instantPayouts" />
              </h3>
              <p>
                <Translate id="instantPayoutsDesc" />
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>
                <Translate id="liveSupport" />
              </h3>
              <p>
                <Translate id="liveSupportDesc" />
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>
                <Translate id="mobileGaming" />
              </h3>
              <p>
                <Translate id="mobileGamingDesc" />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Game Modal */}
      <GameModal 
        game={selectedGame}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Home;
