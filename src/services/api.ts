// API service functions for fetching data from the backend

export interface Game {
  id: number;
  title: string;
  category: string;
  image: string;
  jackpot: string;
  isHot: boolean;
}

export interface Tournament {
  id: number;
  title: string;
  prize: string;
  participants: number;
  maxParticipants: number;
  startDate: string;
  endDate: string;
  status: string;
  game: string;
  image: string;
}

export interface Bonus {
  id: number;
  title: string;
  description: string;
  amount: string;
  type: string;
  category: 'welcome' | 'vip' | 'daily';
  isActive: boolean;
  terms: string;
  icon: string;
  color: string;
}

export interface Jackpot {
  game: string;
  amount: string;
}

export interface User {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  balance: number;
  isVerified: boolean;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

// Games API
export const fetchGames = async (): Promise<Game[]> => {
  const response = await fetch('/api/games');
  if (!response.ok) {
    throw new Error('Failed to fetch games');
  }
  return response.json();
};

export const fetchGame = async (id: number): Promise<Game> => {
  const response = await fetch(`/api/games/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch game');
  }
  return response.json();
};

// Tournaments API
export const fetchTournaments = async (): Promise<Tournament[]> => {
  const response = await fetch('/api/tournaments');
  if (!response.ok) {
    throw new Error('Failed to fetch tournaments');
  }
  return response.json();
};

export const fetchTournament = async (id: number): Promise<Tournament> => {
  const response = await fetch(`/api/tournaments/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch tournament');
  }
  return response.json();
};

export const participateInTournament = async (id: number): Promise<{ success: boolean; message: string }> => {
  const response = await fetch(`/api/tournaments/${id}/participate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to participate in tournament');
  }
  
  return response.json();
};

// Bonuses API
export const fetchBonuses = async (): Promise<Bonus[]> => {
  const response = await fetch('/api/bonuses');
  if (!response.ok) {
    throw new Error('Failed to fetch bonuses');
  }
  return response.json();
};

export const fetchBonus = async (id: number): Promise<Bonus> => {
  const response = await fetch(`/api/bonuses/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch bonus');
  }
  return response.json();
};

export const claimBonus = async (id: number): Promise<{ success: boolean; message: string }> => {
  const response = await fetch(`/api/bonuses/${id}/claim`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to claim bonus');
  }
  
  return response.json();
};

// Jackpots API
export const fetchJackpots = async (): Promise<Jackpot[]> => {
  const response = await fetch('/api/jackpots');
  if (!response.ok) {
    throw new Error('Failed to fetch jackpots');
  }
  return response.json();
};

// Authentication API
export const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }
  
  return response.json();
};

export const signup = async (userData: SignupRequest): Promise<AuthResponse> => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Signup failed');
  }
  
  return response.json();
};

export const logout = async (): Promise<{ success: boolean; message: string }> => {
  const response = await fetch('/api/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Logout failed');
  }
  
  return response.json();
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await fetch('/api/auth/me');
  if (!response.ok) {
    throw new Error('Failed to get current user');
  }
  return response.json();
};
