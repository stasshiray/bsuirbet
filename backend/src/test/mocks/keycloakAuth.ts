import { Request, Response, NextFunction } from 'express';

/**
 * Mock Keycloak user for testing
 */
export const mockKeycloakUser = {
  sub: 'test-user-id',
  email: 'test@example.com',
  preferred_username: 'testuser',
  given_name: 'Test',
  family_name: 'User',
};

/**
 * Mock Keycloak authentication middleware for testing
 * Bypasses actual Keycloak verification
 */
export const mockAuthenticateKeycloak = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Attach mock user to request
  req.keycloakUser = mockKeycloakUser;
  next();
};

/**
 * Create a mock JWT token for testing
 */
export function createMockToken(payload: Record<string, unknown> = {}): string {
  // In a real scenario, you might want to use a proper JWT library
  // For testing purposes, we'll just return a mock token string
  return `mock-token-${JSON.stringify({ ...mockKeycloakUser, ...payload })}`;
}

