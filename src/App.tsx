import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Suspense, lazy } from "react";
import Layout from "./Layout";
import Home from "./HomePage";
import Tournaments from "./TournamentsPage";
import Login from "./LoginPage";
import LoginCallback from "./LoginCallback";
import Signup from "./SignupPage";
import Profile from "./ProfilePage";
import OnlineStatus from "./OnlineStatus";
import LoadingSpinner from "./LoadingSpinner";
import { ThemeProvider } from "./ThemeContext";
import { LanguageProvider } from "./LanguageContext";
import { AuthProvider } from "./AuthContext";
import "./App.css";
import ErrorBoundary from "./ErrorBoundary";

// Lazy load the BonusesPage component
const Bonuses = lazy(() => import("./BonusesPage"));

function App() {
  return (
    <Router>
      <LanguageProvider>
        <ThemeProvider>
          <AuthProvider>
            <OnlineStatus />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/login/callback" element={<LoginCallback />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/*"
                element={
                  <Layout>
                    <Routes>
                      <Route
                        path="/"
                        element={
                          <ErrorBoundary fallback={"Something went wrong"}>
                            <Home />
                          </ErrorBoundary>
                        }
                      />
                      <Route path="/tournaments" element={<Tournaments />} />
                      <Route
                        path="/bonuses"
                        element={
                          <Suspense
                            fallback={
                              <LoadingSpinner
                                message="Loading bonuses..."
                                size="large"
                              />
                            }
                          >
                            <Bonuses />
                          </Suspense>
                        }
                      />
                      <Route path="/profile" element={<Profile />} />
                    </Routes>
                  </Layout>
                }
              />
            </Routes>
          </AuthProvider>
        </ThemeProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;
