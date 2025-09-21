import { loginPage } from '../support/pages/loginPage';
import { inventoryPage } from '../support/pages/inventoryPage';
import { checkoutPageOne } from '../support/pages/checkoutPageOne';
import { checkoutPageTwo } from '../support/pages/checkoutPageTwo';
import users from '../fixtures/users.json';

describe('Order Flow Tests', () => {
  beforeEach(() => {
    loginPage.visit();
  });

  describe('Standard user Order scenarios', () => {

    it('should navigate to checkout step two after filling info', () => {
      cy.login('standard');
      inventoryPage.addFirstItemToCart();
      cy.get('.shopping_cart_link').click();
      cy.get('[data-test="checkout"]').click();

      checkoutPageOne.fillInformation('John', 'Doe', '12345');
      checkoutPageOne.clickContinue();

      // Verify we are on checkout step two
      cy.url().should('include', '/checkout-step-two.html');
      checkoutPageTwo.getItemName().should('be.visible');
    });

    it('should display correct item details in order summary', () => {
      cy.login('standard');
      inventoryPage.addFirstItemToCart();
      cy.get('.shopping_cart_link').click();
      cy.get('[data-test="checkout"]').click();

      checkoutPageOne.fillInformation('John', 'Doe', '12345');
      checkoutPageOne.clickContinue();

      // Verify item quantity, name, and price are displayed
      checkoutPageTwo.getItemQuantity().should('contain.text', '1');
      checkoutPageTwo.getItemName().should('contain.text', 'Sauce Labs Backpack');
      checkoutPageTwo.getItemPrice().should('contain.text', '$29.99');
    });

    it('should display correct subtotal, tax, and total', () => {
      cy.login('standard');
      inventoryPage.addFirstItemToCart();
      cy.get('.shopping_cart_link').click();
      cy.get('[data-test="checkout"]').click();

      checkoutPageOne.fillInformation('John', 'Doe', '12345');
      checkoutPageOne.clickContinue();

      // Verify summary amounts
      checkoutPageTwo.getSubtotalLabel().should('contain.text', 'Item total: $29.99');
      checkoutPageTwo.getTaxLabel().should('contain.text', 'Tax: $2.40');
      checkoutPageTwo.getTotalLabel().should('contain.text', 'Total: $32.39');
    });

    it('should allow user to cancel and return to cart', () => {
      cy.login('standard');
      inventoryPage.addFirstItemToCart();
      cy.get('.shopping_cart_link').click();
      cy.get('[data-test="checkout"]').click();

      checkoutPageOne.fillInformation('John', 'Doe', '12345');
      checkoutPageOne.clickContinue();

      checkoutPageTwo.clickCancel();
      cy.url().should('include', '/inventory.html');
    });

    it('should complete the order successfully', () => {
      cy.login('standard');
      inventoryPage.addFirstItemToCart();
      cy.get('.shopping_cart_link').click();
      cy.get('[data-test="checkout"]').click();

      checkoutPageOne.fillInformation('John', 'Doe', '12345');
      checkoutPageOne.clickContinue();

      checkoutPageTwo.clickFinish();

      // Verify success message
      cy.get('.complete-header').should('contain.text', 'Thank you for your order!');
    });

  });
});
