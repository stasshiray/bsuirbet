import { games, liveGames, type Game } from './data';

// Helper function to get all games (regular + live)
export const getAllGames = (): Game[] => [...games, ...liveGames];

