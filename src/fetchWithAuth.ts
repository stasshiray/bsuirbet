// Wrapper for fetch that automatically handles token refresh on 401 errors
import { userManager } from './AuthContext';

let isRefreshing = false;
let refreshPromise: Promise<unknown> | null = null;

/**
 * Fetches a new access token using silent refresh
 */
async function refreshAccessToken(): Promise<string | null> {
  if (isRefreshing && refreshPromise) {
    return refreshPromise.then(() => {
      const user = userManager.getUser();
      return user.then((u) => (u && !u.expired ? u.access_token : null));
    }) as Promise<string | null>;
  }

  isRefreshing = true;
  refreshPromise = userManager
    .signinSilent()
    .then((user) => {
      isRefreshing = false;
      refreshPromise = null;
      return user?.access_token || null;
    })
    .catch((error) => {
      console.error('Token refresh failed:', error);
      isRefreshing = false;
      refreshPromise = null;
      // If refresh fails, try to get current user
      return userManager.getUser().then((user) => {
        if (user && !user.expired) {
          return user.access_token;
        }
        return null;
      });
    });

  return refreshPromise as Promise<string | null>;
}

/**
 * Gets the current access token from storage
 */
function getCurrentToken(): string | null {
  const keycloakUrl = import.meta.env.VITE_KEYCLOAK_URL || 'http://localhost:8080';
  const realm = import.meta.env.VITE_KEYCLOAK_REALM || 'bsuirbet';
  const clientId = import.meta.env.VITE_KEYCLOAK_CLIENT_ID || 'bsuirbet-frontend';
  const authority = `${keycloakUrl}/realms/${realm}`;
  const storageKey = `oidc.user:${authority}:${clientId}`;

  try {
    const userStr = localStorage.getItem(storageKey);
    if (userStr) {
      const user = JSON.parse(userStr);
      return user?.access_token || null;
    }
  } catch (e) {
    console.error('Error reading token from storage:', e);
  }
  return null;
}

/**
 * Fetches with automatic token refresh on 401 errors
 */
export async function fetchWithAuth(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  // Get current token
  let token = getCurrentToken();
  let retryCount = 0;
  const maxRetries = 1; // Only retry once after token refresh

  // Prepare headers
  const headers = new Headers(options.headers);
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  // Make initial request
  let response = await fetch(url, {
    ...options,
    headers,
  });

  // If we get a 401, try to refresh the token and retry once
  if (response.status === 401 && token && retryCount < maxRetries) {
    console.log('Token expired, attempting to refresh...');
    retryCount++;
    
    const newToken = await refreshAccessToken();
    
    if (newToken && newToken !== token) {
      // Update authorization header with new token
      headers.set('Authorization', `Bearer ${newToken}`);
      
      // Retry the request with the new token
      response = await fetch(url, {
        ...options,
        headers,
      });
    } else {
      // Refresh failed, user needs to re-authenticate
      console.warn('Token refresh failed, user needs to re-authenticate');
    }
  }

  return response;
}

