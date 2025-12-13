import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { UserManager, User, WebStorageStateStore } from "oidc-client-ts";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  getAccessToken: () => string | null;
  refreshToken: () => Promise<User | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Keycloak configuration
const keycloakUrl =
  import.meta.env.VITE_KEYCLOAK_URL || "http://localhost:8080";
const realm = import.meta.env.VITE_KEYCLOAK_REALM || "bsuirbet";
const clientId = import.meta.env.VITE_KEYCLOAK_CLIENT_ID || "bsuirbet-frontend";
const redirectUri =
  import.meta.env.VITE_KEYCLOAK_REDIRECT_URI ||
  `${window.location.origin}/login/callback`;

export const userManager = new UserManager({
  authority: `${keycloakUrl}/realms/${realm}`,
  client_id: clientId,
  redirect_uri: redirectUri,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already signed in
    userManager.getUser().then((user) => {
      setUser(user);
      setIsLoading(false);
    });

    // Listen for user loaded events
    const userLoadedSubscriptionUnsubscribe = userManager.events.addUserLoaded(
      (user) => {
        setUser(user);
      }
    );

    // Listen for user unloaded events
    const userUnloadedSubscriptionUnsubscribe =
      userManager.events.addUserUnloaded(() => {
        setUser(null);
      });

    // Listen for access token expiring
    const accessTokenExpiringSubscriptionUnsubscribe =
      userManager.events.addAccessTokenExpiring(() => {
        console.log("Access token expiring, attempting to renew...");
        // Trigger silent renewal
        userManager.signinSilent().catch((error) => {
          console.error("Silent renewal failed:", error);
        });
      });

    // Listen for access token expired
    const accessTokenExpiredSubscriptionUnsubscribe =
      userManager.events.addAccessTokenExpired(() => {
        console.log("Access token expired, attempting to refresh...");
        // Try to refresh the token
        userManager.signinSilent()
          .then((refreshedUser) => {
            if (refreshedUser) {
              setUser(refreshedUser);
            } else {
              setUser(null);
            }
          })
          .catch((error) => {
            console.error("Token refresh failed:", error);
            setUser(null);
          });
      });

    // Listen for silent renew errors
    const silentRenewErrorSubscriptionUnsubscribe =
      userManager.events.addSilentRenewError((error) => {
        console.error("Silent renew error:", error);
      });

    return () => {
      userLoadedSubscriptionUnsubscribe();
      userUnloadedSubscriptionUnsubscribe();
      accessTokenExpiringSubscriptionUnsubscribe();
      accessTokenExpiredSubscriptionUnsubscribe();
      silentRenewErrorSubscriptionUnsubscribe();
    };
  }, []);

  const login = async () => {
    try {
      await userManager.signinRedirect();
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await userManager.signoutRedirect();
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  const getAccessToken = (): string | null => {
    return user?.access_token || null;
  };

  const refreshToken = async (): Promise<User | null> => {
    try {
      const refreshedUser = await userManager.signinSilent();
      setUser(refreshedUser);
      return refreshedUser;
    } catch (error) {
      console.error('Token refresh error:', error);
      // If silent refresh fails, try to get the current user
      const currentUser = await userManager.getUser();
      if (currentUser && !currentUser.expired) {
        setUser(currentUser);
        return currentUser;
      }
      // If all else fails, clear user and require re-login
      setUser(null);
      return null;
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user && !user.expired,
    login,
    logout,
    getAccessToken,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Helper function to handle OIDC callback
export const handleOidcCallback = async (): Promise<void> => {
  try {
    await userManager.signinCallback();
  } catch (error) {
    console.error("Callback error:", error);
    throw error;
  }
};
