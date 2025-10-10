# BSUIRBet Casino

A modern online casino web application built with React, TypeScript, and Vite. This project is a visual copy of Fonbet.by with a focus on casino games, tournaments, and bonuses.

## Features

- 🎰 **Casino Games**: Interactive game cards with jackpot displays
- 🏆 **Tournaments**: Tournament listings with participation tracking
- 💰 **Bonuses**: Comprehensive bonus system with loyalty program
- 📱 **Responsive Design**: Mobile-first approach with modern UI
- 🎨 **Modern Styling**: Dark theme with gold accents matching casino aesthetics

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Router** for client-side routing
- **CSS3** with modern features (Grid, Flexbox, Gradients)
- **Responsive Design** with mobile-first approach

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Layout.tsx      # Main layout wrapper
│   ├── Header.tsx      # Navigation header
│   ├── Footer.tsx      # Site footer
│   ├── GameCard.tsx    # Game display card
│   ├── TournamentCard.tsx # Tournament display card
│   └── BonusCard.tsx   # Bonus display card
├── pages/              # Page components
│   ├── Home.tsx        # Main games page
│   ├── Tournaments.tsx # Tournaments page
│   └── Bonuses.tsx     # Bonuses page
├── App.tsx             # Main app component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## Getting Started

### Prerequisites

- Node.js (version 20.19.0 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bsuirbet
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Pages

### Home Page (`/`)
- Hero section with welcome message
- Live jackpot displays
- Popular games grid
- Feature highlights

### Tournaments Page (`/tournaments`)
- Active tournament listings
- Tournament details and participation
- Rules and guidelines
- Status tracking

### Bonuses Page (`/bonuses`)
- Available bonus offers
- Loyalty program levels
- Terms and conditions
- Bonus categories

## Design Features

- **Dark Theme**: Professional casino aesthetic
- **Gold Accents**: Premium feel with gold highlights
- **Gradient Backgrounds**: Modern visual appeal
- **Card-based Layout**: Clean, organized content
- **Hover Effects**: Interactive user experience
- **Responsive Grid**: Adapts to all screen sizes

## Components

### GameCard
- Game image with overlay effects
- Jackpot display
- Hot game badges
- Play button interaction

### TournamentCard
- Tournament status indicators
- Prize pool display
- Participation progress
- Date information

### BonusCard
- Bonus type icons
- Amount highlighting
- Terms and conditions
- Active/inactive states

## Styling

The application uses a custom CSS approach with:
- CSS Grid and Flexbox for layouts
- CSS Custom Properties for theming
- Smooth transitions and animations
- Mobile-first responsive design
- Modern CSS features (backdrop-filter, gradients)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is for educational purposes only.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Contact

For questions or support, please contact the development team.
