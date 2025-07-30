describe('SauceDemo Homepage', () => {
  it('should load and display login form', () => {
    cy.visit('https://www.saucedemo.com/');
    cy.get('#login_button_container').should('be.visible');
    cy.get('[data-test="username"]').should('be.visible');
    cy.get('[data-test="password"]').should('be.visible');
  });
});