import { loginPage } from '../support/pages/loginPage';

describe('Login Page', () => {
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

  it('should log in with standard_user from fixture', () => {
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
});
