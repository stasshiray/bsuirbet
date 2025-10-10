import { http, HttpResponse } from 'msw';

// Mock data for games - 20 games based on Fonbet website
const games = [
  {
    id: 1,
    title: 'Wild Joker\'s',
    category: 'Слоты',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Showcase/resources/Casino_desktop.png',
    jackpot: '1,250,000 BYN',
    isHot: true
  },
  {
    id: 2,
    title: '1-2-3 Wildson Fire',
    category: 'Слоты',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Showcase/resources/Roulete_desktop.png',
    jackpot: '850,000 BYN',
    isHot: false
  },
  {
    id: 3,
    title: '10 BulkyFruits',
    category: 'Слоты',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Showcase/resources/Sport_desktop.png',
    jackpot: '650,000 BYN',
    isHot: true
  },
  {
    id: 4,
    title: '10 BurningHeart',
    category: 'Слоты',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Showcase/resources/tvg_desktop.png',
    jackpot: '5,200,000 BYN',
    isHot: true
  },
  {
    id: 5,
    title: '10 Glossy Hot',
    category: 'Слоты',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Showcase/resources/Casino_desktop.png',
    jackpot: '320,000 BYN',
    isHot: false
  },
  {
    id: 6,
    title: '10 Hot HOTFIRE',
    category: 'Слоты',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Showcase/resources/Roulete_desktop.png',
    jackpot: '980,000 BYN',
    isHot: true
  },
  {
    id: 7,
    title: '10 Power Hot',
    category: 'Слоты',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Showcase/resources/Sport_desktop.png',
    jackpot: '750,000 BYN',
    isHot: false
  },
  {
    id: 8,
    title: '10 VampireBeast',
    category: 'Слоты',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Showcase/resources/tvg_desktop.png',
    jackpot: '1,100,000 BYN',
    isHot: true
  },
  {
    id: 9,
    title: '10 Wild Crown',
    category: 'Слоты',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Showcase/resources/Casino_desktop.png',
    jackpot: '920,000 BYN',
    isHot: false
  },
  {
    id: 10,
    title: '10,001 NightsMegaways',
    category: 'Слоты',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Showcase/resources/Roulete_desktop.png',
    jackpot: '2,500,000 BYN',
    isHot: true
  },
  {
    id: 11,
    title: '100 BulkyFruits',
    category: 'Слоты',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Showcase/resources/Sport_desktop.png',
    jackpot: '1,800,000 BYN',
    isHot: true
  },
  {
    id: 12,
    title: '100 BurningHot',
    category: 'Слоты',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Showcase/resources/tvg_desktop.png',
    jackpot: '1,350,000 BYN',
    isHot: false
  },
  {
    id: 13,
    title: '100 Cats',
    category: 'Слоты',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Showcase/resources/Casino_desktop.png',
    jackpot: '680,000 BYN',
    isHot: true
  },
  {
    id: 14,
    title: '100 GoldenCoins',
    category: 'Слоты',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Showcase/resources/Roulete_desktop.png',
    jackpot: '1,450,000 BYN',
    isHot: false
  },
  {
    id: 15,
    title: '100 Jewels',
    category: 'Слоты',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Showcase/resources/Sport_desktop.png',
    jackpot: '890,000 BYN',
    isHot: true
  },
  {
    id: 16,
    title: '100 JokerStaxx',
    category: 'Слоты',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Showcase/resources/tvg_desktop.png',
    jackpot: '1,600,000 BYN',
    isHot: false
  },
  {
    id: 17,
    title: '100 JuicyFruits',
    category: 'Слоты',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Showcase/resources/Casino_desktop.png',
    jackpot: '1,200,000 BYN',
    isHot: true
  },
  {
    id: 18,
    title: '100 Lucky Bell',
    category: 'Слоты',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Showcase/resources/Roulete_desktop.png',
    jackpot: '950,000 BYN',
    isHot: false
  },
  {
    id: 19,
    title: '100 LuckyChilies',
    category: 'Слоты',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Showcase/resources/Sport_desktop.png',
    jackpot: '1,750,000 BYN',
    isHot: true
  },
  {
    id: 20,
    title: 'Gates of Olympus',
    category: 'Слоты',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Showcase/resources/tvg_desktop.png',
    jackpot: '3,200,000 BYN',
    isHot: true
  }
];

// Mock data for tournaments with Fonbet images
const tournaments = [
  {
    id: 1,
    title: 'Wild West Tournament',
    prize: '25,000 BYN + 7,000 FS',
    participants: 1250,
    maxParticipants: 2000,
    startDate: '2024-01-15',
    endDate: '2024-01-22',
    status: 'active',
    game: 'Wild West Games',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Promo/1.BELARUS/Casino_2025/10.October_2025/1.tour_wild_west_25000_7000FS_061025/1377h450.jpg'
  },
  {
    id: 2,
    title: 'Amazing Stories from KA Gaming',
    prize: '15,000 BYN',
    participants: 850,
    maxParticipants: 1000,
    startDate: '2024-01-20',
    endDate: '2024-01-27',
    status: 'upcoming',
    game: 'KA Gaming Slots',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Promo/1.BELARUS/NEW_provider/35.KA_Gaming/1377h450.jpg'
  },
  {
    id: 3,
    title: 'The Path to the Treasure Volcano',
    prize: '10,000 BYN',
    participants: 320,
    maxParticipants: 500,
    startDate: '2024-01-18',
    endDate: '2024-01-25',
    status: 'active',
    game: 'Volcano Adventure',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Promo/1.BELARUS/Slider_casino/2025/10.October/2Week/1377x450px_1_copy.webp'
  },
  {
    id: 4,
    title: 'Fiery Adventures',
    prize: '20,000 BYN',
    participants: 0,
    maxParticipants: 300,
    startDate: '2024-01-25',
    endDate: '2024-02-01',
    status: 'upcoming',
    game: 'Fire-themed Slots',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Promo/1.BELARUS/Slider_casino/2025/10.October/2Week/1377x450px_2_copy.webp'
  },
  {
    id: 5,
    title: 'Hobbits on the Hunt for Gold',
    prize: '18,000 BYN',
    participants: 450,
    maxParticipants: 800,
    startDate: '2024-01-22',
    endDate: '2024-01-29',
    status: 'active',
    game: 'Fantasy Adventure',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Promo/1.BELARUS/Slider_casino/2025/10.October/2Week/1377x450px_3_copy.webp'
  },
  {
    id: 6,
    title: 'Smokey in the City of Lights',
    prize: '12,000 BYN',
    participants: 180,
    maxParticipants: 400,
    startDate: '2024-01-28',
    endDate: '2024-02-04',
    status: 'upcoming',
    game: 'City Adventure',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Promo/1.BELARUS/Slider_casino/2025/10.October/2Week/1377x450px_4_copy.webp'
  }
];

// Mock data for bonuses - 3 distinct categories
const bonuses = [
  // WELCOME BONUSES (Green theme)
  {
    id: 1,
    title: 'Welcome Bonus',
    description: 'Получите 100% бонус на первый депозит до 100 BYN + 300 FS',
    amount: '100 BYN + 300 FS',
    type: 'welcome',
    category: 'welcome',
    isActive: true,
    terms: 'Для всех новых клиентов!',
    icon: '🎁',
    color: '#4caf50'
  },
  {
    id: 2,
    title: 'No Deposit Bonus',
    description: 'Получите бонус без депозита для новых игроков',
    amount: '50 BYN',
    type: 'no-deposit',
    category: 'welcome',
    isActive: true,
    terms: 'Только для новых аккаунтов',
    icon: '🎯',
    color: '#66bb6a'
  },
  {
    id: 3,
    title: 'First Deposit Bonus',
    description: 'Удвойте свой первый депозит с нашим бонусом',
    amount: '200% до 200 BYN',
    type: 'first-deposit',
    category: 'welcome',
    isActive: true,
    terms: 'Максимум 200 BYN бонуса',
    icon: '💰',
    color: '#4caf50'
  },

  // VIP BONUSES (Gold/Purple theme)
  {
    id: 4,
    title: 'VIP Welcome Package',
    description: 'Эксклюзивный пакет для VIP игроков',
    amount: '1000 BYN + 1000 FS',
    type: 'vip-welcome',
    category: 'vip',
    isActive: true,
    terms: 'Только для VIP статуса',
    icon: '👑',
    color: '#ffd700'
  },
  {
    id: 5,
    title: 'VIP Cashback',
    description: 'Повышенный кэшбэк для VIP игроков',
    amount: 'До 25%',
    type: 'vip-cashback',
    category: 'vip',
    isActive: true,
    terms: 'Еженедельный кэшбэк',
    icon: '💎',
    color: '#aa44ff'
  },
  {
    id: 6,
    title: 'VIP Birthday Bonus',
    description: 'Специальный бонус в день рождения для VIP',
    amount: '2000 BYN',
    type: 'vip-birthday',
    category: 'vip',
    isActive: false,
    terms: 'Доступен в день рождения',
    icon: '🎂',
    color: '#ff6b35'
  },

  // DAILY BONUSES (Blue theme)
  {
    id: 7,
    title: 'Daily Cashback',
    description: 'Получайте кэшбэк каждый день за проигранные ставки',
    amount: 'До 15%',
    type: 'daily-cashback',
    category: 'daily',
    isActive: true,
    terms: 'Кэшбэк начисляется ежедневно',
    icon: '💸',
    color: '#4a90e2'
  },
  {
    id: 8,
    title: 'Daily Free Spins',
    description: 'Получайте бесплатные вращения каждый день',
    amount: '50 FS',
    type: 'daily-spins',
    category: 'daily',
    isActive: true,
    terms: 'Обновляется каждые 24 часа',
    icon: '🎰',
    color: '#2196f3'
  },
  {
    id: 9,
    title: 'Weekend Bonus',
    description: 'Дополнительные бонусы в выходные дни',
    amount: '200 BYN',
    type: 'weekend',
    category: 'daily',
    isActive: true,
    terms: 'Доступен каждые выходные',
    icon: '🎉',
    color: '#03a9f4'
  }
];

export const handlers = [
  // Games API
  http.get('/api/games', () => {
    return HttpResponse.json(games);
  }),

  http.get('/api/games/:id', ({ params }) => {
    const { id } = params;
    const game = games.find(g => g.id === parseInt(id as string));
    
    if (!game) {
      return HttpResponse.json(
        { error: 'Game not found' },
        { status: 404 }
      );
    }
    
    return HttpResponse.json(game);
  }),

  // Tournaments API
  http.get('/api/tournaments', () => {
    return HttpResponse.json(tournaments);
  }),

  http.get('/api/tournaments/:id', ({ params }) => {
    const { id } = params;
    const tournament = tournaments.find(t => t.id === parseInt(id as string));
    
    if (!tournament) {
      return HttpResponse.json(
        { error: 'Tournament not found' },
        { status: 404 }
      );
    }
    
    return HttpResponse.json(tournament);
  }),

  // Bonuses API
  http.get('/api/bonuses', () => {
    return HttpResponse.json(bonuses);
  }),

  http.get('/api/bonuses/:id', ({ params }) => {
    const { id } = params;
    const bonus = bonuses.find(b => b.id === parseInt(id as string));
    
    if (!bonus) {
      return HttpResponse.json(
        { error: 'Bonus not found' },
        { status: 404 }
      );
    }
    
    return HttpResponse.json(bonus);
  }),

  // Jackpot API
  http.get('/api/jackpots', () => {
    const jackpots = games
      .filter(game => game.jackpot)
      .map(game => ({
        game: game.title,
        amount: game.jackpot
      }));
    
    return HttpResponse.json(jackpots);
  }),

  // Tournament participation
  http.post('/api/tournaments/:id/participate', ({ params }) => {
    const { id } = params;
    const tournament = tournaments.find(t => t.id === parseInt(id as string));
    
    if (!tournament) {
      return HttpResponse.json(
        { error: 'Tournament not found' },
        { status: 404 }
      );
    }
    
    if (tournament.participants >= tournament.maxParticipants) {
      return HttpResponse.json(
        { error: 'Tournament is full' },
        { status: 400 }
      );
    }
    
    // Simulate successful participation
    return HttpResponse.json({
      success: true,
      message: 'Successfully joined tournament',
      tournament: {
        ...tournament,
        participants: tournament.participants + 1
      }
    });
  }),

  // Bonus claim
  http.post('/api/bonuses/:id/claim', ({ params }) => {
    const { id } = params;
    const bonus = bonuses.find(b => b.id === parseInt(id as string));
    
    if (!bonus) {
      return HttpResponse.json(
        { error: 'Bonus not found' },
        { status: 404 }
      );
    }
    
    if (!bonus.isActive) {
      return HttpResponse.json(
        { error: 'Bonus is not active' },
        { status: 400 }
      );
    }
    
    // Simulate successful bonus claim
    return HttpResponse.json({
      success: true,
      message: 'Bonus claimed successfully',
      bonus
    });
  }),

  // Authentication handlers
  // Login
  http.post('/api/auth/login', async ({ request }) => {
    const { email, password } = await request.json() as { email: string; password: string };
    
    // Simple mock validation
    if (email === 'admin@bsuirbet.com' && password === 'admin123') {
      const user = {
        id: 1,
        email: 'admin@bsuirbet.com',
        username: 'admin',
        firstName: 'Admin',
        lastName: 'User',
        balance: 10000,
        isVerified: true,
        createdAt: '2024-01-01T00:00:00Z'
      };
      return HttpResponse.json({
        success: true,
        message: 'Login successful',
        user,
        token: 'mock-jwt-token-1'
      });
    }
    
    if (email === 'player@bsuirbet.com' && password === 'player123') {
      const user = {
        id: 2,
        email: 'player@bsuirbet.com',
        username: 'player1',
        firstName: 'John',
        lastName: 'Doe',
        balance: 2500,
        isVerified: true,
        createdAt: '2024-01-15T00:00:00Z'
      };
      return HttpResponse.json({
        success: true,
        message: 'Login successful',
        user,
        token: 'mock-jwt-token-2'
      });
    }
    
    return HttpResponse.json(
      { success: false, message: 'Invalid email or password' },
      { status: 401 }
    );
  }),

  // Signup
  http.post('/api/auth/signup', async ({ request }) => {
    const { email, username, firstName, lastName } = await request.json() as {
      email: string;
      password: string;
      username: string;
      firstName: string;
      lastName: string;
    };
    
    // Check if user already exists (simple mock check)
    if (email === 'admin@bsuirbet.com' || email === 'player@bsuirbet.com') {
      return HttpResponse.json(
        { success: false, message: 'User with this email already exists' },
        { status: 400 }
      );
    }
    
    // Create new user
    const newUser = {
      id: Math.floor(Math.random() * 1000) + 3,
      email,
      username,
      firstName,
      lastName,
      balance: 100, // Welcome bonus
      isVerified: false,
      createdAt: new Date().toISOString()
    };
    
    return HttpResponse.json({
      success: true,
      message: 'Account created successfully',
      user: newUser,
      token: 'mock-jwt-token-' + newUser.id
    });
  }),

  // Logout
  http.post('/api/auth/logout', () => {
    return HttpResponse.json({
      success: true,
      message: 'Logged out successfully'
    });
  }),

  // Get current user
  http.get('/api/auth/me', ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        { success: false, message: 'No token provided' },
        { status: 401 }
      );
    }
    
    const token = authHeader.replace('Bearer ', '');
    
    // Mock user data based on token
    let user;
    if (token === 'mock-jwt-token-1') {
      user = {
        id: 1,
        email: 'admin@bsuirbet.com',
        username: 'admin',
        firstName: 'Admin',
        lastName: 'User',
        balance: 10000,
        isVerified: true,
        createdAt: '2024-01-01T00:00:00Z'
      };
    } else if (token === 'mock-jwt-token-2') {
      user = {
        id: 2,
        email: 'player@bsuirbet.com',
        username: 'player1',
        firstName: 'John',
        lastName: 'Doe',
        balance: 2500,
        isVerified: true,
        createdAt: '2024-01-15T00:00:00Z'
      };
    } else {
      return HttpResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401 }
      );
    }
    
    return HttpResponse.json(user);
  })
];
