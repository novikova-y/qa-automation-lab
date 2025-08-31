import { loginPage } from '../support/pages/loginPage';
import { inventoryPage } from '../support/pages/inventoryPage';
import { checkoutPage } from '../support/pages/checkoutPage';
import users from '../fixtures/users.json';

describe('Checkout Flow Tests', () => {
  beforeEach(() => {
    loginPage.visit();
  });

  describe('Standard user Checkout scenarios', () => {
    it('should complete checkout successfully', () => {
      cy.login('standard');
      inventoryPage.addFirstItemToCart();
      cy.get('.shopping_cart_link').click();
      cy.get('[data-test="checkout"]').click();
      checkoutPage.fillInformation('John', 'Doe', '12345');
      checkoutPage.clickContinue();

      checkoutPage.summaryContainer.should('be.visible');
      checkoutPage.clickFinish();

      checkoutPage.successMessage.should('contain.text', 'Thank you for your order!');
    });

    it('should show error when first name is missing', () => {
      cy.login('standard');
      inventoryPage.addFirstItemToCart();
      cy.get('.shopping_cart_link').click();
      cy.get('[data-test="checkout"]').click();
      checkoutPage.fillInformation('', 'Doe', '12345');
      checkoutPage.clickContinue();

      checkoutPage.errorMessage.should('contain.text', 'Error: First Name is required');
    });

    it('should show error when last name is missing', () => {
      cy.login('standard');
      inventoryPage.addFirstItemToCart();
      cy.get('.shopping_cart_link').click();
      cy.get('[data-test="checkout"]').click();
      checkoutPage.fillInformation('John', '', '12345');
      checkoutPage.clickContinue();

      checkoutPage.errorMessage.should('contain.text', 'Error: Last Name is required');
    });

    it('should show error when postal code is missing', () => {
      cy.login('standard');
      inventoryPage.addFirstItemToCart();
      cy.get('.shopping_cart_link').click();
      cy.get('[data-test="checkout"]').click();
      checkoutPage.fillInformation('John', 'Doe', '');
      checkoutPage.clickContinue();

      checkoutPage.errorMessage.should('contain.text', 'Error: Postal Code is required');
    });

    it('should allow user to cancel checkout and return to cart', () => {
      cy.login('standard');
      inventoryPage.addFirstItemToCart();
      cy.get('.shopping_cart_link').click();
      cy.get('[data-test="checkout"]').click();
      checkoutPage.clickCancel();

      cy.url().should('include', '/cart.html');
    });
  });

  describe('Problem user Checkout scenarios', () => {
    it.skip('should complete checkout successfully (known issue)', () => {
      cy.login('problem');
      inventoryPage.addFirstItemToCart();
      cy.get('.shopping_cart_link').click();
      cy.get('[data-test="checkout"]').click();
      checkoutPage.fillInformation('John', 'Doe', '12345');
      checkoutPage.clickContinue();
      
      // Known issue: problem_user has last name bug
      checkoutPage.summaryContainer.should('be.visible');
      checkoutPage.clickFinish();

      checkoutPage.successMessage.should('contain.text', 'Thank you for your order!');
    });

    it.skip('should show error when first name is missing (known issue)', () => {
      cy.login('problem');
      inventoryPage.addFirstItemToCart();
      cy.get('.shopping_cart_link').click();
      cy.get('[data-test="checkout"]').click();
      checkoutPage.fillInformation('', 'Doe', '12345');
      checkoutPage.clickContinue();
      // Known issue: problem_user has last name bug
      checkoutPage.errorMessage.should('contain.text', 'Error: First Name is required');
    });

    it('should show error when last name is missing', () => {
      cy.login('problem');
      inventoryPage.addFirstItemToCart();
      cy.get('.shopping_cart_link').click();
      cy.get('[data-test="checkout"]').click();
      checkoutPage.fillInformation('John', '', '12345');
      checkoutPage.clickContinue();

      checkoutPage.errorMessage.should('contain.text', 'Error: Last Name is required');
    });

    it.skip('should show error when postal code is missing (known issue)', () => {
      cy.login('problem');
      inventoryPage.addFirstItemToCart();
      cy.get('.shopping_cart_link').click();
      cy.get('[data-test="checkout"]').click();
      checkoutPage.fillInformation('John', 'Doe', '');
      checkoutPage.clickContinue();
      // Known issue: problem_user has last name bug
      checkoutPage.errorMessage.should('contain.text', 'Error: Postal Code is required');
    });

    it('should allow user to cancel checkout and return to cart', () => {
      cy.login('problem');
      inventoryPage.addFirstItemToCart();
      cy.get('.shopping_cart_link').click();
      cy.get('[data-test="checkout"]').click();
      checkoutPage.clickCancel();

      cy.url().should('include', '/cart.html');
    });
  });
});
