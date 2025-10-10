# MSW (Mock Service Worker) Setup

This directory contains the MSW setup for mocking backend API calls in development.

## Files

- `handlers.ts` - Contains all the mock API handlers for games, tournaments, and bonuses
- `browser.ts` - Browser-specific MSW worker setup
- `README.md` - This documentation file

## API Endpoints

The following API endpoints are mocked:

### Games
- `GET /api/games` - Get all games
- `GET /api/games/:id` - Get specific game by ID

### Tournaments
- `GET /api/tournaments` - Get all tournaments
- `GET /api/tournaments/:id` - Get specific tournament by ID
- `POST /api/tournaments/:id/participate` - Participate in a tournament

### Bonuses
- `GET /api/bonuses` - Get all bonuses
- `GET /api/bonuses/:id` - Get specific bonus by ID
- `POST /api/bonuses/:id/claim` - Claim a bonus

### Jackpots
- `GET /api/jackpots` - Get current jackpot amounts

## Usage

MSW is automatically started in development mode. The mock service worker intercepts API calls and returns mock data instead of making real network requests.

## Development

To add new mock endpoints:

1. Add the handler to `handlers.ts`
2. Add the corresponding API function to `src/services/api.ts`
3. Update components to use the new API function

## Production

MSW is only active in development mode (`import.meta.env.DEV`). In production, the application will make real API calls to the backend.
