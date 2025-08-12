import { loginPage } from '../support/pages/loginPage';
import { inventoryPage } from '../support/pages/inventoryPage';
import { checkoutPage } from '../support/pages/checkoutPage';
import users from '../fixtures/users.json';

describe('Checkout Flow Tests', () => {
  beforeEach(() => {
    // login as standard user
    loginPage.visit();
    cy.login('standard');

    // add item to cart
    inventoryPage.addFirstItemToCart();

    // go to cart
    cy.get('.shopping_cart_link').click();

    // start checkout
    cy.get('[data-test="checkout"]').click();
  });

  it('should complete checkout successfully', () => {
    checkoutPage.fillInformation('John', 'Doe', '12345');
    checkoutPage.clickContinue();

    checkoutPage.summaryContainer.should('be.visible');
    checkoutPage.clickFinish();

    checkoutPage.successMessage.should('contain.text', 'Thank you for your order!');
  });

  it('should show error when first name is missing', () => {
    checkoutPage.fillInformation('', 'Doe', '12345');
    checkoutPage.clickContinue();

    checkoutPage.errorMessage.should('contain.text', 'Error: First Name is required');
  });

  it('should show error when last name is missing', () => {
    checkoutPage.fillInformation('John', '', '12345');
    checkoutPage.clickContinue();

    checkoutPage.errorMessage.should('contain.text', 'Error: Last Name is required');
  });

  it('should show error when postal code is missing', () => {
    checkoutPage.fillInformation('John', 'Doe', '');
    checkoutPage.clickContinue();

    checkoutPage.errorMessage.should('contain.text', 'Error: Postal Code is required');
  });

  it('should allow user to cancel checkout and return to cart', () => {
    checkoutPage.clickCancel();
    cy.url().should('include', '/cart.html');
  });
});
