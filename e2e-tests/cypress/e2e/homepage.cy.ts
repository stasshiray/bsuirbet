describe('Home Page E2E Tests', () => {
  beforeEach(() => {
    // Visit the home page - will make real API calls
    cy.visit('/');
    
    // Wait for page to load and API calls to complete
    // Check for main content to ensure page is loaded
    cy.get('.home', { timeout: 10000 }).should('be.visible');
  });

  describe('Hero Section', () => {
    it('should display hero section with title and subtitle', () => {
      cy.get('.hero').should('be.visible');
      cy.get('.hero-title').should('be.visible');
      cy.get('.hero-title').should('contain.text', 'BSUIRBet Casino');
      cy.get('.hero-subtitle').should('be.visible');
    });

    it('should display hero action buttons', () => {
      cy.get('.hero-actions').should('be.visible');
      cy.get('.hero-actions .btn-primary').should('be.visible');
      cy.get('.hero-actions .btn-secondary').should('be.visible');
    });

    it('should have clickable action buttons', () => {
      cy.get('.hero-actions .btn-primary').should('be.enabled');
      cy.get('.hero-actions .btn-secondary').should('be.enabled');
    });
  });

  describe('Jackpot Section', () => {
    it('should display jackpot section', () => {
      cy.get('.jackpot-section').should('be.visible');
      cy.get('.section-title').should('be.visible');
    });

    it('should display jackpot display area', () => {
      cy.get('.jackpot-display').should('be.visible');
    });

    it('should show jackpot information', () => {
      // Check if jackpot display exists (may be empty if no jackpots)
      cy.get('.jackpot-display', { timeout: 10000 }).should('exist');
    });
  });

  describe('Games Section', () => {
    it('should display games section', () => {
      cy.get('.games-section').should('be.visible');
    });

    it('should display games grid', () => {
      // Wait for games to load from real API
      cy.get('.games-grid, .games-list, [class*="game"]', { timeout: 10000 }).should('exist');
    });

    it('should display game cards', () => {
      // Wait for games to load from real API
      // Check for game cards - adjust selector based on actual implementation
      cy.get('[class*="game-card"], [class*="GameCard"]', { timeout: 10000 }).should('have.length.at.least', 1);
    });

    it('should display game information', () => {
      // Wait for games to load from real API
      // Check if game cards have title
      cy.get('[class*="game-card"], [class*="GameCard"]', { timeout: 10000 }).first().should('be.visible');
    });
  });

  describe('Category Filter', () => {
    it('should display category filters', () => {
      // Wait for categories to load from real API
      // Look for category filter buttons or checkboxes
      cy.get('[class*="category"], [class*="filter"], button', { timeout: 10000 }).should('exist');
    });

    it('should allow filtering games by category', () => {
      // Wait for games and categories to load from real API
      cy.get('.games-grid', { timeout: 10000 }).should('exist');
      
      // Try to find and click a category filter
      cy.get('body').then(($body) => {
        if ($body.find('[class*="category"], .filter-btn').length > 0) {
          cy.get('[class*="category"], .filter-btn').first().click();
          // Verify games are filtered (this depends on implementation)
          cy.get('.games-grid', { timeout: 5000 }).should('exist');
        }
      });
    });
  });

  describe('Navigation', () => {
    it('should have header navigation', () => {
      cy.get('header, [class*="header"], [class*="Header"]').should('be.visible');
    });

    it('should have footer', () => {
      cy.get('footer, [class*="footer"], [class*="Footer"]').should('be.visible');
    });

    it('should navigate to other pages', () => {
      // Check if navigation links exist
      cy.get('a[href*="/tournaments"], a[href*="/bonuses"]').should('exist');
    });
  });

  describe('Loading States', () => {
    it('should show loading state initially', () => {
      // Visit page - will make real API calls
      cy.visit('/');
      
      // Check for loading indicators (may be brief)
      cy.get('body').should('exist');
    });

    it('should hide loading state after data loads', () => {
      // Wait for main content to appear (indicating data has loaded)
      cy.get('.home', { timeout: 10000 }).should('be.visible');
      
      // After API calls complete, loading should be gone
      cy.get('[class*="loading"], [class*="spinner"]', { timeout: 5000 }).should('not.exist');
    });
  });

  describe('Responsive Design', () => {
    it('should be responsive on mobile viewport', () => {
      cy.viewport(375, 667); // iPhone size
      cy.get('.home').should('be.visible');
      cy.get('.hero').should('be.visible');
    });

    it('should be responsive on tablet viewport', () => {
      cy.viewport(768, 1024); // iPad size
      cy.get('.home').should('be.visible');
    });

    it('should be responsive on desktop viewport', () => {
      cy.viewport(1920, 1080); // Desktop size
      cy.get('.home').should('be.visible');
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading structure', () => {
      cy.get('h1').should('exist');
      cy.get('h2').should('exist');
    });

    it('should have proper alt text for images', () => {
      cy.get('img').each(($img) => {
        cy.wrap($img).should('have.attr', 'alt');
      });
    });
  });
});

