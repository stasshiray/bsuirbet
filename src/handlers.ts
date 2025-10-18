import { http, HttpResponse } from 'msw';

// Mock data for providers
const providers = [
  {
    id: 'netent',
    name: 'NetEnt',
    logo: 'https://via.placeholder.com/100x50/4CAF50/FFFFFF?text=NetEnt',
    description: 'Leading provider of premium online casino games with innovative features and cutting-edge graphics.',
    isActive: true,
    gameCount: 5
  },
  {
    id: 'microgaming',
    name: 'Microgaming',
    logo: 'https://via.placeholder.com/100x50/2196F3/FFFFFF?text=Microgaming',
    description: 'Pioneer in online gaming industry, known for classic slots and progressive jackpots.',
    isActive: true,
    gameCount: 4
  },
  {
    id: 'playngo',
    name: 'Play\'n GO',
    logo: 'https://via.placeholder.com/100x50/FF9800/FFFFFF?text=Play\'n+GO',
    description: 'Mobile-first gaming provider specializing in high-quality HTML5 slot games.',
    isActive: true,
    gameCount: 4
  },
  {
    id: 'evolution',
    name: 'Evolution Gaming',
    logo: 'https://via.placeholder.com/100x50/9C27B0/FFFFFF?text=Evolution',
    description: 'World leader in live casino games, expanding into premium slot game development.',
    isActive: true,
    gameCount: 4
  },
  {
    id: 'pragmatic',
    name: 'Pragmatic Play',
    logo: 'https://via.placeholder.com/100x50/F44336/FFFFFF?text=Pragmatic',
    description: 'Fast-growing provider offering diverse portfolio of slots, live casino, and bingo games.',
    isActive: true,
    gameCount: 3
  }
];

// Mock data for games - 20 games based on Fonbet website
const games = [
  {
    id: 1,
    title: 'Wild Joker\'s',
    category: 'Слоты',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Showcase/resources/Casino_desktop.png',
    jackpot: '1,250,000 BYN',
    isHot: true,
    providerId: 'netent'
  },
  {
    id: 2,
    title: '1-2-3 Wildson Fire',
    category: 'Слоты',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Showcase/resources/Roulete_desktop.png',
    jackpot: '850,000 BYN',
    isHot: false,
    providerId: 'microgaming'
  },
  {
    id: 3,
    title: '10 BulkyFruits',
    category: 'Слоты',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Showcase/resources/Sport_desktop.png',
    jackpot: '650,000 BYN',
    isHot: true,
    providerId: 'playngo'
  },
  {
    id: 4,
    title: '10 BurningHeart',
    category: 'Слоты',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Showcase/resources/tvg_desktop.png',
    jackpot: '5,200,000 BYN',
    isHot: true,
    providerId: 'netent'
  },
  {
    id: 5,
    title: '10 Glossy Hot',
    category: 'Слоты',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Showcase/resources/Casino_desktop.png',
    jackpot: '320,000 BYN',
    isHot: false,
    providerId: 'microgaming'
  },
  {
    id: 6,
    title: '10 Hot HOTFIRE',
    category: 'Слоты',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Showcase/resources/Roulete_desktop.png',
    jackpot: '980,000 BYN',
    isHot: true,
    providerId: 'playngo'
  },
  {
    id: 7,
    title: '10 Power Hot',
    category: 'Слоты',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Showcase/resources/Sport_desktop.png',
    jackpot: '750,000 BYN',
    isHot: false,
    providerId: 'evolution'
  },
  {
    id: 8,
    title: '10 VampireBeast',
    category: 'Слоты',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Showcase/resources/tvg_desktop.png',
    jackpot: '1,100,000 BYN',
    isHot: true,
    providerId: 'netent'
  },
  {
    id: 9,
    title: '10 Wild Crown',
    category: 'Слоты',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Showcase/resources/Casino_desktop.png',
    jackpot: '920,000 BYN',
    isHot: false,
    providerId: 'microgaming'
  },
  {
    id: 10,
    title: '10,001 NightsMegaways',
    category: 'Слоты',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Showcase/resources/Roulete_desktop.png',
    jackpot: '2,500,000 BYN',
    isHot: true,
    providerId: 'playngo'
  },
  {
    id: 11,
    title: '100 BulkyFruits',
    category: 'Слоты',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Showcase/resources/Sport_desktop.png',
    jackpot: '1,800,000 BYN',
    isHot: true,
    providerId: 'evolution'
  },
  {
    id: 12,
    title: '100 BurningHot',
    category: 'Слоты',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Showcase/resources/tvg_desktop.png',
    jackpot: '1,350,000 BYN',
    isHot: false,
    providerId: 'netent'
  },
  {
    id: 13,
    title: '100 Cats',
    category: 'Слоты',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Showcase/resources/Casino_desktop.png',
    jackpot: '680,000 BYN',
    isHot: true,
    providerId: 'microgaming'
  },
  {
    id: 14,
    title: '100 GoldenCoins',
    category: 'Слоты',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Showcase/resources/Roulete_desktop.png',
    jackpot: '1,450,000 BYN',
    isHot: false,
    providerId: 'playngo'
  },
  {
    id: 15,
    title: '100 Jewels',
    category: 'Слоты',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Showcase/resources/Sport_desktop.png',
    jackpot: '890,000 BYN',
    isHot: true,
    providerId: 'evolution'
  },
  {
    id: 16,
    title: '100 JokerStaxx',
    category: 'Слоты',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Showcase/resources/tvg_desktop.png',
    jackpot: '1,600,000 BYN',
    isHot: false,
    providerId: 'netent'
  },
  {
    id: 17,
    title: '100 JuicyFruits',
    category: 'Слоты',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Showcase/resources/Casino_desktop.png',
    jackpot: '1,200,000 BYN',
    isHot: true,
    providerId: 'microgaming'
  },
  {
    id: 18,
    title: '100 Lucky Bell',
    category: 'Слоты',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Showcase/resources/Roulete_desktop.png',
    jackpot: '950,000 BYN',
    isHot: false,
    providerId: 'playngo'
  },
  {
    id: 19,
    title: '100 LuckyChilies',
    category: 'Слоты',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Showcase/resources/Sport_desktop.png',
    jackpot: '1,750,000 BYN',
    isHot: true,
    providerId: 'evolution'
  },
  {
    id: 20,
    title: 'Gates of Olympus',
    category: 'Слоты',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Showcase/resources/tvg_desktop.png',
    jackpot: '3,200,000 BYN',
    isHot: true,
    providerId: 'netent'
  }
];

// Mock data for live games
const liveGames = [
  {
    id: 21,
    title: 'Live Blackjack',
    category: 'Live Games',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Showcase/resources/Casino_desktop.png',
    jackpot: '500,000 BYN',
    isHot: true,
    providerId: 'evolution'
  },
  {
    id: 22,
    title: 'Live Roulette',
    category: 'Live Games',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Showcase/resources/Roulete_desktop.png',
    jackpot: '750,000 BYN',
    isHot: false,
    providerId: 'evolution'
  },
  {
    id: 23,
    title: 'Live Baccarat',
    category: 'Live Games',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Showcase/resources/Sport_desktop.png',
    jackpot: '1,000,000 BYN',
    isHot: true,
    providerId: 'evolution'
  },
  {
    id: 24,
    title: 'Live Poker',
    category: 'Live Games',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Showcase/resources/tvg_desktop.png',
    jackpot: '2,500,000 BYN',
    isHot: true,
    providerId: 'evolution'
  },
  {
    id: 25,
    title: 'Live Sic Bo',
    category: 'Live Games',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Showcase/resources/Casino_desktop.png',
    jackpot: '300,000 BYN',
    isHot: false,
    providerId: 'evolution'
  },
  {
    id: 26,
    title: 'Live Dragon Tiger',
    category: 'Live Games',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Showcase/resources/Roulete_desktop.png',
    jackpot: '400,000 BYN',
    isHot: true,
    providerId: 'evolution'
  },
  {
    id: 27,
    title: 'Live Lightning Roulette',
    category: 'Live Games',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Showcase/resources/Sport_desktop.png',
    jackpot: '1,500,000 BYN',
    isHot: true,
    providerId: 'evolution'
  },
  {
    id: 28,
    title: 'Live Dream Catcher',
    category: 'Live Games',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Showcase/resources/tvg_desktop.png',
    jackpot: '800,000 BYN',
    isHot: false,
    providerId: 'evolution'
  },
  {
    id: 29,
    title: 'Live Monopoly',
    category: 'Live Games',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Showcase/resources/Casino_desktop.png',
    jackpot: '1,200,000 BYN',
    isHot: true,
    providerId: 'evolution'
  },
  {
    id: 30,
    title: 'Live Crazy Time',
    category: 'Live Games',
    image: 'https://origin-s3.by0e87-resources.by/ContentBY/Showcase/resources/Roulete_desktop.png',
    jackpot: '2,000,000 BYN',
    isHot: true,
    providerId: 'evolution'
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

// Mock data for bonuses with discriminated unions
const bonuses = [
  // WELCOME BONUSES (Green theme)
  {
    id: 1,
    title: 'Welcome Bonus',
    description: 'Получите 100% бонус на первый депозит до 100 BYN + 300 FS',
    amount: '100 BYN + 300 FS',
    type: 'welcome',
    category: 'welcome',
    welcomeType: 'new-user',
    maxAmount: 100,
    minDeposit: 10,
    wageringRequirement: 35,
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
    welcomeType: 'no-deposit',
    maxAmount: 50,
    wageringRequirement: 40,
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
    welcomeType: 'first-deposit',
    maxAmount: 200,
    minDeposit: 20,
    wageringRequirement: 30,
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
    vipLevel: 'diamond',
    exclusiveFeatures: ['Персональный менеджер', 'Приоритетная поддержка', 'Эксклюзивные игры'],
    personalManager: true,
    higherLimits: true,
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
    vipLevel: 'platinum',
    exclusiveFeatures: ['Еженедельный кэшбэк', 'Быстрые выплаты'],
    personalManager: true,
    higherLimits: true,
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
    vipLevel: 'gold',
    exclusiveFeatures: ['Специальные подарки', 'Персональные поздравления'],
    personalManager: false,
    higherLimits: false,
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
    frequency: 'daily',
    resetTime: '00:00 UTC',
    maxClaims: 1,
    currentClaims: 0,
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
    frequency: 'daily',
    resetTime: '00:00 UTC',
    maxClaims: 1,
    currentClaims: 0,
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
    frequency: 'weekly',
    resetTime: 'Понедельник 00:00 UTC',
    maxClaims: 2,
    currentClaims: 0,
    isActive: true,
    terms: 'Доступен каждые выходные',
    icon: '🎉',
    color: '#03a9f4'
  }
];

// Mock translation data
const translations = {
  ru: {
    // Navigation
    games: 'Игры',
    tournaments: 'Турниры',
    bonuses: 'Бонусы',
    login: 'Войти',
    register: 'Регистрация',
    logout: 'Выйти',
    
    // Header
    balance: 'Баланс',
    
    // Home Page
    welcomeTitle: 'Добро пожаловать в BSUIRBet',
    welcomeSubtitle: 'Лучшие игры, турниры и бонусы ждут вас!',
    playNow: 'Играть сейчас',
    learnMore: 'Узнать больше',
    
    // Jackpot Section
    jackpotTitle: 'Джекпоты',
    megaJackpot: 'Мега Джекпот',
    superJackpot: 'Супер Джекпот',
    ultraJackpot: 'Ультра Джекпот',
    
    // Features
    featuresTitle: 'Почему выбирают нас',
    secureGaming: 'Безопасная игра',
    secureGamingDesc: 'Защищенные транзакции и честная игра',
    instantPayouts: 'Мгновенные выплаты',
    instantPayoutsDesc: 'Быстрые и надежные выводы средств',
    liveSupport: 'Поддержка 24/7',
    liveSupportDesc: 'Круглосуточная помощь наших специалистов',
    mobileGaming: 'Мобильные игры',
    mobileGamingDesc: 'Играйте в любое время и в любом месте',
    
    // Login Page
    loginTitle: 'Вход в аккаунт',
    loginSubtitle: 'Войдите в свой аккаунт для продолжения',
    email: 'Email',
    password: 'Пароль',
    rememberMe: 'Запомнить меня',
    forgotPassword: 'Забыли пароль?',
    noAccount: 'Нет аккаунта?',
    createAccount: 'Создать аккаунт',
    
    // Demo credentials
    demoCredentials: 'Демо аккаунты',
    demoAccount1: 'Email: demo@bsuirbet.com, Пароль: demo123',
    demoAccount2: 'Email: test@bsuirbet.com, Пароль: test123',
    
    // Signup Page
    signupTitle: 'Создать аккаунт',
    signupSubtitle: 'Зарегистрируйтесь и получите бонус',
    firstName: 'Имя',
    lastName: 'Фамилия',
    confirmPassword: 'Подтвердите пароль',
    agreeTerms: 'Я согласен с условиями использования',
    haveAccount: 'Уже есть аккаунт?',
    signIn: 'Войти',
    
    // Welcome bonus
    welcomeBonus: '🎁 Добро пожаловать! Получите 1000 BYN бонус при регистрации',
    
    // Tournaments Page
    tournamentsTitle: 'Турниры',
    tournamentsSubtitle: 'Участвуйте в турнирах и выигрывайте призы',
    activeTournaments: 'Активные турниры',
    upcomingTournaments: 'Предстоящие турниры',
    tournamentName: 'Название турнира',
    prizePool: 'Призовой фонд',
    participants: 'Участники',
    timeLeft: 'Осталось времени',
    joinTournament: 'Участвовать',
    
    // Bonuses Page
    bonusesTitle: 'Бонусы',
    bonusesSubtitle: 'Получите бонусы и увеличите свой баланс',
    availableBonuses: 'Доступные бонусы',
    bonusName: 'Название бонуса',
    bonusAmount: 'Сумма бонуса',
    bonusDescription: 'Описание',
    claimBonus: 'Получить бонус',
    
    // Game Card
    playGame: 'Играть',
    provider: 'Провайдер',
    category: 'Категория',
    jackpot: 'Джекпот',
    
    // Common
    loading: 'Загрузка...',
    error: 'Ошибка',
    success: 'Успешно',
    cancel: 'Отмена',
    confirm: 'Подтвердить',
    save: 'Сохранить',
    edit: 'Редактировать',
    delete: 'Удалить',
    close: 'Закрыть',
    back: 'Назад',
    next: 'Далее',
    previous: 'Предыдущий',
    search: 'Поиск',
    filter: 'Фильтр',
    sort: 'Сортировка',
    all: 'Все',
    none: 'Нет',
    yes: 'Да',
    no: 'Нет',
    
    // Time
    seconds: 'сек',
    minutes: 'мин',
    hours: 'ч',
    days: 'дн',
    
    // Currency
    currency: 'BYN',
    
    // Footer
    aboutUs: 'О нас',
    contactUs: 'Связаться с нами',
    privacyPolicy: 'Политика конфиденциальности',
    termsOfService: 'Условия использования',
    responsibleGaming: 'Ответственная игра',
    support: 'Поддержка',
    faq: 'Часто задаваемые вопросы',
    help: 'Помощь',
    copyright: '© 2024 BSUIRBet. Все права защищены.',
    
    // Theme
    lightTheme: 'Светлая тема',
    darkTheme: 'Темная тема',
    
    // Language
    language: 'Язык',
    russian: 'Русский',
    english: 'English',
    
    // Additional
    username: 'Имя пользователя',
    tryAgain: 'Попробовать снова',
    popularGames: 'Популярные игры',
    
    // Live Games
    liveGames: 'Живые игры',
    liveIndicator: 'В ЭФИРЕ',
    
    // Online Status
    backOnline: 'Вы снова в сети',
    goneOffline: 'Вы офлайн',
    offline: 'Офлайн',
    backOnlineDesc: 'Соединение восстановлено',
    offlineDesc: 'Проверьте подключение к интернету',
    
    // Tournaments specific
    loadingTournaments: 'Загрузка турниров...',
    tournamentJoined: 'Вы успешно присоединились к турниру!',
    tournamentJoinFailed: 'Не удалось присоединиться к турниру',
    tournamentRules: 'Правила турниров',
    participation: 'Участие',
    participationDesc: 'Зарегистрируйтесь в турнире и играйте в указанную игру',
    ranking: 'Рейтинг',
    rankingDesc: 'Зарабатывайте очки за каждую выигранную ставку',
    prizes: 'Призы',
    prizesDesc: 'Призовые места получают денежные награды',
    time: 'Время',
    timeDesc: 'Турниры проходят в ограниченное время',
    active: 'Активные',
    upcoming: 'Скоро',
    
    // Bonuses specific
    loadingBonuses: 'Загрузка бонусов...',
    bonusClaimed: 'Бонус успешно получен!',
    bonusClaimFailed: 'Не удалось получить бонус',
    welcomeBonuses: 'Добро пожаловать',
    welcomeBonusesDesc: 'Специальные бонусы для новых игроков',
    vipBonuses: 'VIP Бонусы',
    vipBonusesDesc: 'Эксклюзивные предложения для VIP игроков',
    dailyBonuses: 'Ежедневные бонусы',
    dailyBonusesDesc: 'Регулярные награды для активных игроков',
    bonusTerms: 'Общие условия бонусов',
    wagering: 'Вейджер',
    wageringDesc: 'Все бонусы имеют условия отыгрыша (вейджер)',
    validity: 'Срок действия',
    validityDesc: 'Бонусы действительны в течение ограниченного времени',
    gamesDesc: 'Некоторые игры могут не учитываться в вейджере',
    rules: 'Правила',
    rulesDesc: 'Соблюдайте правила казино для получения бонусов',
    loyaltyProgram: 'Программа лояльности',
    bronze: 'Бронза',
    bronzePoints: '0-999 очков',
    basicBonuses: 'Базовые бонусы',
    standardSupport: 'Стандартная поддержка',
    silver: 'Серебро',
    silverPoints: '1000-4999 очков',
    increasedBonuses: 'Увеличенные бонусы',
    prioritySupport: 'Приоритетная поддержка',
    personalManager: 'Персональный менеджер',
    gold: 'Золото',
    goldPoints: '5000-9999 очков',
    maximumBonuses: 'Максимальные бонусы',
    vipSupport: 'VIP поддержка 24/7',
    exclusiveOffers: 'Эксклюзивные акции',
    platinum: 'Платина',
    platinumPoints: '10000+ очков',
    exclusiveBonuses: 'Эксклюзивные бонусы',
    personalOffers: 'Персональные предложения',
    individualTerms: 'Индивидуальные условия'
  },
  en: {
    // Navigation
    games: 'Games',
    tournaments: 'Tournaments',
    bonuses: 'Bonuses',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    
    // Header
    balance: 'Balance',
    
    // Home Page
    welcomeTitle: 'Welcome to BSUIRBet',
    welcomeSubtitle: 'The best games, tournaments and bonuses await you!',
    playNow: 'Play Now',
    learnMore: 'Learn More',
    
    // Jackpot Section
    jackpotTitle: 'Jackpots',
    megaJackpot: 'Mega Jackpot',
    superJackpot: 'Super Jackpot',
    ultraJackpot: 'Ultra Jackpot',
    
    // Features
    featuresTitle: 'Why Choose Us',
    secureGaming: 'Secure Gaming',
    secureGamingDesc: 'Protected transactions and fair play',
    instantPayouts: 'Instant Payouts',
    instantPayoutsDesc: 'Fast and reliable withdrawals',
    liveSupport: '24/7 Support',
    liveSupportDesc: 'Round-the-clock help from our specialists',
    mobileGaming: 'Mobile Gaming',
    mobileGamingDesc: 'Play anytime, anywhere',
    
    // Login Page
    loginTitle: 'Login to Account',
    loginSubtitle: 'Sign in to your account to continue',
    email: 'Email',
    password: 'Password',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password?',
    noAccount: 'Don\'t have an account?',
    createAccount: 'Create account',
    
    // Demo credentials
    demoCredentials: 'Demo Accounts',
    demoAccount1: 'Email: demo@bsuirbet.com, Password: demo123',
    demoAccount2: 'Email: test@bsuirbet.com, Password: test123',
    
    // Signup Page
    signupTitle: 'Create Account',
    signupSubtitle: 'Register and get a bonus',
    firstName: 'First Name',
    lastName: 'Last Name',
    confirmPassword: 'Confirm Password',
    agreeTerms: 'I agree to the terms of service',
    haveAccount: 'Already have an account?',
    signIn: 'Sign In',
    
    // Welcome bonus
    welcomeBonus: '🎁 Welcome! Get 1000 BYN bonus on registration',
    
    // Tournaments Page
    tournamentsTitle: 'Tournaments',
    tournamentsSubtitle: 'Participate in tournaments and win prizes',
    activeTournaments: 'Active Tournaments',
    upcomingTournaments: 'Upcoming Tournaments',
    tournamentName: 'Tournament Name',
    prizePool: 'Prize Pool',
    participants: 'Participants',
    timeLeft: 'Time Left',
    joinTournament: 'Join Tournament',
    
    // Bonuses Page
    bonusesTitle: 'Bonuses',
    bonusesSubtitle: 'Get bonuses and increase your balance',
    availableBonuses: 'Available Bonuses',
    bonusName: 'Bonus Name',
    bonusAmount: 'Bonus Amount',
    bonusDescription: 'Description',
    claimBonus: 'Claim Bonus',
    
    // Game Card
    playGame: 'Play',
    provider: 'Provider',
    category: 'Category',
    jackpot: 'Jackpot',
    
    // Common
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    cancel: 'Cancel',
    confirm: 'Confirm',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    close: 'Close',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    all: 'All',
    none: 'None',
    yes: 'Yes',
    no: 'No',
    
    // Time
    seconds: 'sec',
    minutes: 'min',
    hours: 'h',
    days: 'd',
    
    // Currency
    currency: 'BYN',
    
    // Footer
    aboutUs: 'About Us',
    contactUs: 'Contact Us',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    responsibleGaming: 'Responsible Gaming',
    support: 'Support',
    faq: 'FAQ',
    help: 'Help',
    copyright: '© 2024 BSUIRBet. All rights reserved.',
    
    // Theme
    lightTheme: 'Light Theme',
    darkTheme: 'Dark Theme',
    
    // Language
    language: 'Language',
    russian: 'Русский',
    english: 'English',
    
    // Additional
    username: 'Username',
    tryAgain: 'Try Again',
    popularGames: 'Popular Games',
    
    // Live Games
    liveGames: 'Live Games',
    liveIndicator: 'LIVE',
    
    // Online Status
    backOnline: 'You are back online',
    goneOffline: 'You are offline',
    offline: 'Offline',
    backOnlineDesc: 'Connection restored',
    offlineDesc: 'Check your internet connection',
    
    // Tournaments specific
    loadingTournaments: 'Loading tournaments...',
    tournamentJoined: 'Successfully joined tournament!',
    tournamentJoinFailed: 'Failed to join tournament',
    tournamentRules: 'Tournament Rules',
    participation: 'Participation',
    participationDesc: 'Register for the tournament and play the specified game',
    ranking: 'Ranking',
    rankingDesc: 'Earn points for every winning bet',
    prizes: 'Prizes',
    prizesDesc: 'Prize places receive monetary rewards',
    time: 'Time',
    timeDesc: 'Tournaments run for a limited time',
    active: 'Active',
    upcoming: 'Upcoming',
    
    // Bonuses specific
    loadingBonuses: 'Loading bonuses...',
    bonusClaimed: 'Bonus successfully claimed!',
    bonusClaimFailed: 'Failed to claim bonus',
    welcomeBonuses: 'Welcome Bonuses',
    welcomeBonusesDesc: 'Special bonuses for new players',
    vipBonuses: 'VIP Bonuses',
    vipBonusesDesc: 'Exclusive offers for VIP players',
    dailyBonuses: 'Daily Bonuses',
    dailyBonusesDesc: 'Regular rewards for active players',
    bonusTerms: 'Bonus Terms',
    wagering: 'Wagering',
    wageringDesc: 'All bonuses have wagering requirements',
    validity: 'Validity',
    validityDesc: 'Bonuses are valid for a limited time',
    gamesDesc: 'Some games may not count towards wagering',
    rules: 'Rules',
    rulesDesc: 'Follow casino rules to receive bonuses',
    loyaltyProgram: 'Loyalty Program',
    bronze: 'Bronze',
    bronzePoints: '0-999 points',
    basicBonuses: 'Basic bonuses',
    standardSupport: 'Standard support',
    silver: 'Silver',
    silverPoints: '1000-4999 points',
    increasedBonuses: 'Increased bonuses',
    prioritySupport: 'Priority support',
    personalManager: 'Personal manager',
    gold: 'Gold',
    goldPoints: '5000-9999 points',
    maximumBonuses: 'Maximum bonuses',
    vipSupport: 'VIP support 24/7',
    exclusiveOffers: 'Exclusive offers',
    platinum: 'Platinum',
    platinumPoints: '10000+ points',
    exclusiveBonuses: 'Exclusive bonuses',
    personalOffers: 'Personal offers',
    individualTerms: 'Individual terms'
  }
};

export const handlers = [
  // Games API
  http.get('/api/games', ({ request }) => {
    const url = new URL(request.url);
    const categories = url.searchParams.getAll('category');
    
    // Combine all games (regular + live)
    const allGames = [...games, ...liveGames];
    
    if (categories.length === 0) {
      return HttpResponse.json(allGames);
    }
    
    const filteredGames = allGames.filter(game => 
      categories.includes(game.category)
    );
    
    return HttpResponse.json(filteredGames);
  }),

  http.get('/api/games/:id', ({ params }) => {
    const { id } = params;
    const allGames = [...games, ...liveGames];
    const game = allGames.find(g => g.id === parseInt(id as string));
    
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

  // Providers API
  http.get('/api/providers', () => {
    return HttpResponse.json(providers);
  }),

  http.get('/api/providers/:id', ({ params }) => {
    const { id } = params;
    const provider = providers.find(p => p.id === id);
    
    if (!provider) {
      return HttpResponse.json(
        { error: 'Provider not found' },
        { status: 404 }
      );
    }
    
    return HttpResponse.json(provider);
  }),

  // Jackpot API
  http.get('/api/jackpots', () => {
    const allGames = [...games, ...liveGames];
    const jackpots = allGames
      .filter(game => game.jackpot)
      .map(game => ({
        gameId: game.id,
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
  }),

  // Translation API endpoints
  http.get('/api/translations/:language', ({ params }) => {
    const { language } = params;
    
    if (language !== 'ru' && language !== 'en') {
      return HttpResponse.json(
        { error: 'Unsupported language' },
        { status: 400 }
      );
    }
    
    // Simulate network delay
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(HttpResponse.json({
          success: true,
          language,
          translations: translations[language as keyof typeof translations]
        }));
      }, 100);
    });
  }),

  // Get all available languages
  http.get('/api/translations', () => {
    return HttpResponse.json({
      success: true,
      languages: [
        { code: 'ru', name: 'Русский', flag: '🇷🇺' },
        { code: 'en', name: 'English', flag: '🇺🇸' }
      ]
    });
  }),

  // Categories API
  http.get('/api/categories', () => {
    const allGames = [...games, ...liveGames];
    const categories = [...new Set(allGames.map(game => game.category))];
    return HttpResponse.json({
      success: true,
      categories
    });
  })
];
