class LoginPage {
  visit() {
    cy.visit('/');
  }

  get usernameInput() {
    return cy.get('[data-test="username"]');
  }

  get passwordInput() {
    return cy.get('[data-test="password"]');
  }

  get loginButton() {
    return cy.get('[data-test="login-button"]');
  }

  login(username, password) {
    this.usernameInput.type(username);
    this.passwordInput.type(password);
    this.loginButton.click();
  }
}

export const loginPage = new LoginPage();