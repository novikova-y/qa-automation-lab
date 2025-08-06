import { loginPage } from '../support/pages/loginPage';

describe('Login Page with various users from fixtures', () => {
  beforeEach(() => {
    loginPage.visit();
  });

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

  it('should show error for locked_out_user', () => {
    cy.login('locked');
    cy.get('[data-test="error"]').should('contain.text', 'locked out');
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

  it('should show error for empty credentials', () => {
    loginPage.loginButton.click();
    cy.get('[data-test="error"]').should('contain.text', 'Username is required');
  });
});
