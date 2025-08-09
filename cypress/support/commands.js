// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// support/commands.js

Cypress.Commands.add('login', (user) => {
  // If 'user' is a string, treat it as a fixture key and load credentials from fixture
  if (typeof user === 'string') {
    cy.fixture('users').then((users) => {
      const userData = users[user];

      if (!userData) {
        throw new Error(`User type "${user}" not found in fixtures`);
      }

      cy.visit('https://www.saucedemo.com/');
      cy.get('[data-test="username"]').type(userData.username);
      cy.get('[data-test="password"]').type(userData.password);
      cy.get('[data-test="login-button"]').click();
    });
  } else if (typeof user === 'object' && user.username && user.password) {
    // If 'user' is an object with username and password, use it directly
    cy.visit('https://www.saucedemo.com/');
    cy.get('[data-test="username"]').type(user.username);
    cy.get('[data-test="password"]').type(user.password);
    cy.get('[data-test="login-button"]').click();
  } else {
    throw new Error('Invalid argument passed to cy.login(): expected string (fixture key) or object with username and password');
  }
});
