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
    cy.fixture('users').then(users => {
      const { username, password } = users.standard;
      loginPage.login(username, password);
      cy.url().should('include', '/inventory.html');
    });
  });

  it('should show error for locked_out_user', () => {
    cy.fixture('users').then(users => {
      const { username, password } = users.locked;
      loginPage.login(username, password);
      cy.get('[data-test="error"]').should('contain.text', 'locked out');
    });
  });

  it('should log in with problem_user', () => {
    cy.fixture('users').then(users => {
      const { username, password } = users.problem;
      loginPage.login(username, password);
      cy.url().should('include', '/inventory.html');
    });
  });

  it('should log in with performance_glitch_user', () => {
    cy.fixture('users').then(users => {
      const { username, password } = users.glitch;
      loginPage.login(username, password);
      cy.url().should('include', '/inventory.html');
    });
  });

  it('should log in with error_user', () => {
    cy.fixture('users').then(users => {
      const { username, password } = users.error;
      loginPage.login(username, password);
      cy.url().should('include', '/inventory.html');
    });
  });

  it('should log in with visual_user', () => {
    cy.fixture('users').then(users => {
      const { username, password } = users.visual;
      loginPage.login(username, password);
      cy.url().should('include', '/inventory.html');
    });
  });

  it('should show error for empty credentials', () => {
    loginPage.loginButton.click();
    cy.get('[data-test="error"]').should('contain.text', 'Username is required');
  });
});
