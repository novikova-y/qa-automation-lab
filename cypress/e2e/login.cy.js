import { loginPage } from '../support/pages/loginPage';

describe('Login Page Tests', () => {
  beforeEach(() => {
    loginPage.visit();
  });

  describe('Positive Scenarios', () => {
    it('should load and display login form', () => {
      cy.url().should('include', 'saucedemo');
      cy.title().should('include', 'Swag Labs');

      loginPage.usernameInput.should('be.visible');
      loginPage.passwordInput.should('be.visible');
      loginPage.loginButton.should('be.visible');
    });

    it('should log in with standard_user', () => {
      cy.login('standard');
      cy.url().should('include', '/inventory.html');
    });

    it('should log in with problem_user', () => {
      cy.login('problem');
      cy.url().should('include', '/inventory.html');
    });

    it('should log in with performance_glitch_user', () => {
      cy.login('glitch');
      cy.url().should('include', '/inventory.html');
    });

    it('should log in with error_user', () => {
      cy.login('error');
      cy.url().should('include', '/inventory.html');
    });

    it('should log in with visual_user', () => {
      cy.login('visual');
      cy.url().should('include', '/inventory.html');
    });
  });

  describe('Negative Scenarios', () => {
    it('should show error for locked_out_user', () => {
      cy.login('locked');
      cy.get('[data-test="error"]').should('contain.text', 'Epic sadface: Sorry, this user has been locked out.');
    });

    it('should show error for empty credentials', () => {
      loginPage.loginButton.click();
      cy.get('[data-test="error"]').should('contain.text', 'Username is required');
    });

    it('should show error for empty username', () => {
      cy.login({ username: ' ', password: 'secret_sauce' });
      loginPage.loginButton.click();
      cy.get('[data-test="error"]').should('contain.text', 'Epic sadface: Username and password do not match any user in this service');
    });

    it('should show error for empty password', () => {
      cy.login({ username: 'standard_user', password: ' ' });
      loginPage.loginButton.click();
      cy.get('[data-test="error"]').should('contain.text', 'Epic sadface: Username and password do not match any user in this service');
    });

    it('should show error for a non-existing user', () => {
      cy.login({ username: 'non_existing_user', password: 'wrong_password' });
      cy.get('[data-test="error"]').should('contain.text', 'Epic sadface: Username and password do not match any user in this service');
    });

  });
});
