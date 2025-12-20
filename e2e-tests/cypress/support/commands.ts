/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to wait for API calls to complete
       * @example cy.waitForApi()
       */
      waitForApi(): Chainable<void>;
      
    }
  }
}

Cypress.Commands.add('waitForApi', () => {
  // Wait for network requests to complete (real API calls)
  cy.intercept('GET', '/api/**').as('apiCall');
  cy.wait('@apiCall', { timeout: 10000 });
});

// Note: mockApi command removed - tests now use real API endpoints

export {};

