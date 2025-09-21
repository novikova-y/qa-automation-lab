import { loginPage } from '../support/pages/loginPage';
import { inventoryPage } from '../support/pages/inventoryPage';
import { checkoutPageOne} from '../support/pages/checkoutPageOne';

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
      checkoutPageOne.fillInformation('John', 'Doe', '12345');
      checkoutPageOne.clickContinue();

      checkoutPageOne.summaryContainer.should('be.visible');
      checkoutPageOne.clickFinish();

      checkoutPageOne.successMessage.should('contain.text', 'Thank you for your order!');
    });

    it('should show error when first name is missing', () => {
      cy.login('standard');
      inventoryPage.addFirstItemToCart();
      cy.get('.shopping_cart_link').click();
      cy.get('[data-test="checkout"]').click();
      checkoutPageOne.fillInformation('', 'Doe', '12345');
      checkoutPageOne.clickContinue();

      checkoutPageOne.errorMessage.should('contain.text', 'Error: First Name is required');
    });

    it('should show error when last name is missing', () => {
      cy.login('standard');
      inventoryPage.addFirstItemToCart();
      cy.get('.shopping_cart_link').click();
      cy.get('[data-test="checkout"]').click();
      checkoutPageOne.fillInformation('John', '', '12345');
      checkoutPageOne.clickContinue();

      checkoutPageOne.errorMessage.should('contain.text', 'Error: Last Name is required');
    });

    it('should show error when postal code is missing', () => {
      cy.login('standard');
      inventoryPage.addFirstItemToCart();
      cy.get('.shopping_cart_link').click();
      cy.get('[data-test="checkout"]').click();
      checkoutPageOne.fillInformation('John', 'Doe', '');
      checkoutPageOne.clickContinue();

      checkoutPageOne.errorMessage.should('contain.text', 'Error: Postal Code is required');
    });

    it('should allow user to cancel checkout and return to cart', () => {
      cy.login('standard');
      inventoryPage.addFirstItemToCart();
      cy.get('.shopping_cart_link').click();
      cy.get('[data-test="checkout"]').click();
      checkoutPageOne.clickCancel();

      cy.url().should('include', '/cart.html');
    });
  });

  describe('Problem user Checkout scenarios', () => {
    it.skip('should complete checkout successfully (known issue)', () => {
      cy.login('problem');
      inventoryPage.addFirstItemToCart();
      cy.get('.shopping_cart_link').click();
      cy.get('[data-test="checkout"]').click();
      checkoutPageOne.fillInformation('John', 'Doe', '12345');
      checkoutPageOne.clickContinue();
      
      // Known issue: problem_user has last name bug
      checkoutPageOne.summaryContainer.should('be.visible');
      checkoutPageOne.clickFinish();

      checkoutPageOne.successMessage.should('contain.text', 'Thank you for your order!');
    });

    it.skip('should show error when first name is missing (known issue)', () => {
      cy.login('problem');
      inventoryPage.addFirstItemToCart();
      cy.get('.shopping_cart_link').click();
      cy.get('[data-test="checkout"]').click();
      checkoutPageOne.fillInformation('', 'Doe', '12345');
      checkoutPageOne.clickContinue();
      // Known issue: problem_user has last name bug
      checkoutPageOne.errorMessage.should('contain.text', 'Error: First Name is required');
    });

    it('should show error when last name is missing', () => {
      cy.login('problem');
      inventoryPage.addFirstItemToCart();
      cy.get('.shopping_cart_link').click();
      cy.get('[data-test="checkout"]').click();
      checkoutPageOne.fillInformation('John', '', '12345');
      checkoutPageOne.clickContinue();

      checkoutPageOne.errorMessage.should('contain.text', 'Error: Last Name is required');
    });

    it.skip('should show error when postal code is missing (known issue)', () => {
      cy.login('problem');
      inventoryPage.addFirstItemToCart();
      cy.get('.shopping_cart_link').click();
      cy.get('[data-test="checkout"]').click();
      checkoutPageOne.fillInformation('John', 'Doe', '');
      checkoutPageOne.clickContinue();
      // Known issue: problem_user has last name bug
      checkoutPageOne.errorMessage.should('contain.text', 'Error: Postal Code is required');
    });

    it('should allow user to cancel checkout and return to cart', () => {
      cy.login('problem');
      inventoryPage.addFirstItemToCart();
      cy.get('.shopping_cart_link').click();
      cy.get('[data-test="checkout"]').click();
      checkoutPageOne.clickCancel();

      cy.url().should('include', '/cart.html');
    });
  });

  describe('Locked out user Checkout scenarios', () => {

  it('should display error and prevent login', () => {
    cy.login('locked');
    cy.get('[data-test="error"]').should('contain.text', 'Epic sadface: Sorry, this user has been locked out.');
  });

  it.skip('should NOT be able to complete checkout (locked user)', () => {
    // This user cannot log in, so checkout flow is not possible
    cy.login('locked');
  });

  it.skip('should NOT show errors for missing fields (locked user)', () => {
    // Known limitation: locked user cannot access checkout
    cy.login('locked');
  });

  it.skip('should NOT be able to cancel checkout (locked user)', () => {
    // Locked user cannot reach cart/checkout pages
    cy.login('locked');
  });

    
});

describe('Glitch user Checkout scenarios', () => {
    it('should complete checkout successfully', () => {
      cy.login('glitch');
      inventoryPage.addFirstItemToCart();
      cy.get('.shopping_cart_link').click();
      cy.get('[data-test="checkout"]').click();
      checkoutPageOne.fillInformation('John', 'Doe', '12345');
      checkoutPageOne.clickContinue();

      checkoutPageOne.summaryContainer.should('be.visible');
      checkoutPageOne.clickFinish();

      checkoutPageOne.successMessage.should('contain.text', 'Thank you for your order!');
    });

    it('should show error when first name is missing', () => {
      cy.login('glitch');
      inventoryPage.addFirstItemToCart();
      cy.get('.shopping_cart_link').click();
      cy.get('[data-test="checkout"]').click();
      checkoutPageOne.fillInformation('', 'Doe', '12345');
      checkoutPageOne.clickContinue();

      checkoutPageOne.errorMessage.should('contain.text', 'Error: First Name is required');
    });

    it('should show error when last name is missing', () => {
      cy.login('glitch');
      inventoryPage.addFirstItemToCart();
      cy.get('.shopping_cart_link').click();
      cy.get('[data-test="checkout"]').click();
      checkoutPageOne.fillInformation('John', '', '12345');
      checkoutPageOne.clickContinue();

      checkoutPageOne.errorMessage.should('contain.text', 'Error: Last Name is required');
    });

    it('should show error when postal code is missing', () => {
      cy.login('glitch');
      inventoryPage.addFirstItemToCart();
      cy.get('.shopping_cart_link').click();
      cy.get('[data-test="checkout"]').click();
      checkoutPageOne.fillInformation('John', 'Doe', '');
      checkoutPageOne.clickContinue();

      checkoutPageOne.errorMessage.should('contain.text', 'Error: Postal Code is required');
    });

    it('should allow user to cancel checkout and return to cart', () => {
      cy.login('glitch');
      inventoryPage.addFirstItemToCart();
      cy.get('.shopping_cart_link').click();
      cy.get('[data-test="checkout"]').click();
      checkoutPageOne.clickCancel();

      cy.url().should('include', '/cart.html');
    });
  });

  describe('Error user Checkout scenarios', () => {
    it.skip('should complete checkout successfully (known issue)', () => {
      cy.login('error');
      inventoryPage.addFirstItemToCart();
      cy.get('.shopping_cart_link').click();
      cy.get('[data-test="checkout"]').click();
      checkoutPageOne.fillInformation('John', 'Doe', '12345');
      checkoutPageOne.clickContinue();

      checkoutPageOne.summaryContainer.should('be.visible');
      checkoutPageOne.clickFinish();

      checkoutPageOne.successMessage.should('contain.text', 'Thank you for your order!');
    });

    it.skip('should show error when first name is missing (known issue)', () => {
      cy.login('error');
      inventoryPage.addFirstItemToCart();
      cy.get('.shopping_cart_link').click();
      cy.get('[data-test="checkout"]').click();
      checkoutPageOne.fillInformation('', 'Doe', '12345');
      checkoutPageOne.clickContinue();

      checkoutPageOne.errorMessage.should('contain.text', 'Error: First Name is required');
    });

    it.skip('should show error when last name is missing (known issue)', () => {
      cy.login('error');
      inventoryPage.addFirstItemToCart();
      cy.get('.shopping_cart_link').click();
      cy.get('[data-test="checkout"]').click();
      checkoutPageOne.fillInformation('John', '', '12345');
      checkoutPageOne.clickContinue();

      checkoutPageOne.errorMessage.should('contain.text', 'Error: Last Name is required');
    });

    it.skip('should show error when postal code is missing (known issue)', () => {
      cy.login('error');
      inventoryPage.addFirstItemToCart();
      cy.get('.shopping_cart_link').click();
      cy.get('[data-test="checkout"]').click();
      checkoutPageOne.fillInformation('John', 'Doe', '');
      checkoutPageOne.clickContinue();

      checkoutPageOne.errorMessage.should('contain.text', 'Error: Postal Code is required');
    });

    it('should allow user to cancel checkout and return to cart', () => {
      cy.login('error');
      inventoryPage.addFirstItemToCart();
      cy.get('.shopping_cart_link').click();
      cy.get('[data-test="checkout"]').click();
      checkoutPageOne.clickCancel();

      cy.url().should('include', '/cart.html');
    });
  });

  describe('Visual user Checkout scenarios', () => {
    it('should complete checkout successfully', () => {
      cy.login('visual');
      inventoryPage.addFirstItemToCart();
      cy.get('.shopping_cart_link').click();
      cy.get('[data-test="checkout"]').click();
      checkoutPageOne.fillInformation('John', 'Doe', '12345');
      checkoutPageOne.clickContinue();

      checkoutPageOne.summaryContainer.should('be.visible');
      checkoutPageOne.clickFinish();

      checkoutPageOne.successMessage.should('contain.text', 'Thank you for your order!');
    });

    it('should show error when first name is missing', () => {
      cy.login('visual');
      inventoryPage.addFirstItemToCart();
      cy.get('.shopping_cart_link').click();
      cy.get('[data-test="checkout"]').click();
      checkoutPageOne.fillInformation('', 'Doe', '12345');
      checkoutPageOne.clickContinue();

      checkoutPageOne.errorMessage.should('contain.text', 'Error: First Name is required');
    });

    it('should show error when last name is missing', () => {
      cy.login('visual');
      inventoryPage.addFirstItemToCart();
      cy.get('.shopping_cart_link').click();
      cy.get('[data-test="checkout"]').click();
      checkoutPageOne.fillInformation('John', '', '12345');
      checkoutPageOne.clickContinue();

      checkoutPageOne.errorMessage.should('contain.text', 'Error: Last Name is required');
    });

    it('should show error when postal code is missing', () => {
      cy.login('visual');
      inventoryPage.addFirstItemToCart();
      cy.get('.shopping_cart_link').click();
      cy.get('[data-test="checkout"]').click();
      checkoutPageOne.fillInformation('John', 'Doe', '');
      checkoutPageOne.clickContinue();

      checkoutPageOne.errorMessage.should('contain.text', 'Error: Postal Code is required');
    });

    it('should allow user to cancel checkout and return to cart', () => {
      cy.login('visual');
      inventoryPage.addFirstItemToCart();
      cy.get('.shopping_cart_link').click();
      cy.get('[data-test="checkout"]').click();
      checkoutPageOne.clickCancel();

      cy.url().should('include', '/cart.html');
    });
  });

});
