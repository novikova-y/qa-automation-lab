import { loginPage } from '../support/pages/loginPage';
import { inventoryPage } from '../support/pages/inventoryPage';

describe('Inventory Page Tests', () => {
  beforeEach(() => {
    loginPage.visit();
    cy.login('standard');
    cy.url().should('include', '/inventory.html');
    inventoryPage.inventoryContainer.should('be.visible');
  });

  it('should display list of inventory items with name, price, and Add to cart button', () => {
    inventoryPage.itemCards.should('have.length.greaterThan', 0);

    inventoryPage.itemCards.each(($el) => {
      cy.wrap($el).find('.inventory_item_name').should('be.visible');
      cy.wrap($el).find('.inventory_item_price').should('be.visible');
      cy.wrap($el).find('button').should('contain.text', 'Add to cart');
    });
  });

  it('should navigate to item detail page when clicking an item', () => {
    inventoryPage.openFirstItem();
    cy.url().should('include', '/inventory-item');
    cy.get('.inventory_details_name').should('be.visible');
  });

  it('should add first item to the cart and update cart badge', () => {
    inventoryPage.addFirstItemToCart();
    cy.get('.shopping_cart_badge').should('contain.text', '1');
  });

  it('should sort items by price low to high', () => {
    inventoryPage.sortBy('Price (low to high)');
    inventoryPage.getItemPrices().then((prices) => {
      const sorted = [...prices].sort((a, b) => a - b);
      expect(prices).to.deep.equal(sorted);
    });
  });

  it('should sort items by price high to low', () => {
    inventoryPage.sortBy('Price (high to low)');
    inventoryPage.getItemPrices().then((prices) => {
      const sorted = [...prices].sort((a, b) => b - a);
      expect(prices).to.deep.equal(sorted);
    });
  });

});
