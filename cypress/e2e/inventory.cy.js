import { loginPage } from '../support/pages/loginPage';
import { inventoryPage } from '../support/pages/inventoryPage';

describe('Inventory Page Tests', () => {
  beforeEach(() => {
    loginPage.visit();
  });

  describe('Standard user Scenarios', () => {

  it('should display list of inventory items with name, price, and Add to cart button for standart user', () => {
    cy.login('standard');
    cy.url().should('include', '/inventory.html');
    inventoryPage.inventoryContainer.should('be.visible');
    inventoryPage.itemCards.should('have.length.greaterThan', 0);

    inventoryPage.itemCards.each(($el) => {
      cy.wrap($el).find('.inventory_item_name').should('be.visible');
      cy.wrap($el).find('.inventory_item_price').should('be.visible');
      cy.wrap($el).find('button').should('contain.text', 'Add to cart');
    });
  });

  it('should navigate to item detail page when clicking an item for standart user', () => {
    cy.login('standard');
    cy.url().should('include', '/inventory.html');
    inventoryPage.inventoryContainer.should('be.visible');
    inventoryPage.itemCards.should('have.length.greaterThan', 0);
    inventoryPage.openFirstItem();
    cy.url().should('include', '/inventory-item');
    cy.get('.inventory_details_name').should('be.visible');
  });

  it('should add first item to the cart and update cart badge for standart user', () => {
    cy.login('standard');
    cy.url().should('include', '/inventory.html');
    inventoryPage.inventoryContainer.should('be.visible');
    inventoryPage.itemCards.should('have.length.greaterThan', 0);
    inventoryPage.addFirstItemToCart();
    cy.get('.shopping_cart_badge').should('contain.text', '1');
  });

  it('should sort items by price low to high for standart user', () => {
    cy.login('standard');
    cy.url().should('include', '/inventory.html');
    inventoryPage.inventoryContainer.should('be.visible');
    inventoryPage.itemCards.should('have.length.greaterThan', 0);
    inventoryPage.sortBy('Price (low to high)');
    inventoryPage.getItemPrices().then((prices) => {
      const sorted = [...prices].sort((a, b) => a - b);
      expect(prices).to.deep.equal(sorted);
    });
  });

  it('should sort items by price high to low for standart user', () => {
    cy.login('standard');
    cy.url().should('include', '/inventory.html');
    inventoryPage.inventoryContainer.should('be.visible');
    inventoryPage.itemCards.should('have.length.greaterThan', 0);
    inventoryPage.sortBy('Price (high to low)');
    inventoryPage.getItemPrices().then((prices) => {
      const sorted = [...prices].sort((a, b) => b - a);
      expect(prices).to.deep.equal(sorted);
    });
  });

  it('should sort items from A to Z for standart user', () => {
    cy.login('standard');
    cy.url().should('include', '/inventory.html');
    inventoryPage.inventoryContainer.should('be.visible');
    inventoryPage.itemCards.should('have.length.greaterThan', 0);
    inventoryPage.sortBy('Name (A to Z)');
    inventoryPage.getItemNames().then((names) => {
      const sorted = [...names].sort((a, b) => a.localeCompare(b));
      expect(names).to.deep.equal(sorted);
    });
  });

  it('should sort items from Z to A for standart user', () => {
    cy.login('standard');
    cy.url().should('include', '/inventory.html');
    inventoryPage.inventoryContainer.should('be.visible');
    inventoryPage.itemCards.should('have.length.greaterThan', 0);
    inventoryPage.sortBy('Name (Z to A)');
    inventoryPage.getItemNames().then((names) => {
      const sorted = [...names].sort((a, b) => b.localeCompare(a));
      expect(names).to.deep.equal(sorted);
    });
  });

  it('should show error when accessing inventory after logout for standart user', () => {
    cy.login('standard');
    cy.url().should('include', '/inventory.html');
    inventoryPage.inventoryContainer.should('be.visible');
    inventoryPage.itemCards.should('have.length.greaterThan', 0);
    inventoryPage.burgerMenu().should('be.visible').click();
    inventoryPage.logoutButton().should('be.visible').click();
    cy.visit('/inventory.html', { failOnStatusCode: false });
    cy.get('[data-test="error"]').should('contain.text', "Epic sadface: You can only access '/inventory.html' when you are logged in.")
      .should('be.visible');
  });
  });

  describe('Locked out user Scenarios', () => {

  it('should display error instead of the list of inventory items for locked user', () => {
    cy.login('locked');
    cy.get('[data-test="error"]').should('contain.text', 'Epic sadface: Sorry, this user has been locked out.');

  });

  it('should not navigate to item detail page when clicking an item for locked user', () => {
    cy.login('locked');
    cy.get('[data-test="error"]').should('contain.text', 'Epic sadface: Sorry, this user has been locked out.');
  });
  });

  describe('Problem user Scenarios', () => {

  it('should display list of inventory items with name, price, and Add to cart button for problem user', () => {
    cy.login('problem');
    cy.url().should('include', '/inventory.html');
    inventoryPage.inventoryContainer.should('be.visible');
    inventoryPage.itemCards.should('have.length.greaterThan', 0);

    inventoryPage.itemCards.each(($el) => {
      cy.wrap($el).find('.inventory_item_name').should('be.visible');
      cy.wrap($el).find('.inventory_item_price').should('be.visible');
      cy.wrap($el).find('button').should('contain.text', 'Add to cart');
    });
  });

  it('should navigate to item detail page when clicking an item for problem user', () => {
    cy.login('problem');
    cy.url().should('include', '/inventory.html');
    inventoryPage.inventoryContainer.should('be.visible');
    inventoryPage.itemCards.should('have.length.greaterThan', 0);
    inventoryPage.openFirstItem();
    cy.url().should('include', '/inventory-item');
    cy.get('.inventory_details_name').should('be.visible');
  });

  it('should add first item to the cart and update cart badge for problem user', () => {
    cy.login('problem');
    cy.url().should('include', '/inventory.html');
    inventoryPage.inventoryContainer.should('be.visible');
    inventoryPage.itemCards.should('have.length.greaterThan', 0);
    inventoryPage.addFirstItemToCart();
    cy.get('.shopping_cart_badge').should('contain.text', '1');
  });

  it.skip('should sort items by price low to high for problem user', () => {
    cy.login('problem');
    cy.url().should('include', '/inventory.html');
    inventoryPage.inventoryContainer.should('be.visible');
    inventoryPage.itemCards.should('have.length.greaterThan', 0);
    inventoryPage.sortBy('Price (low to high)');
    inventoryPage.getItemPrices().then((prices) => {
      const sorted = [...prices].sort((a, b) => a - b);
      expect(prices).to.deep.equal(sorted);
    });
  });

  it.skip('should sort items by price high to low for problem user', () => {
    cy.login('problem');
    cy.url().should('include', '/inventory.html');
    inventoryPage.inventoryContainer.should('be.visible');
    inventoryPage.itemCards.should('have.length.greaterThan', 0);
    inventoryPage.sortBy('Price (high to low)');
    inventoryPage.getItemPrices().then((prices) => {
      const sorted = [...prices].sort((a, b) => b - a);
      expect(prices).to.deep.equal(sorted);
    });
  });

  it('should sort items from A to Z for problem user', () => {
    cy.login('problem');
    cy.url().should('include', '/inventory.html');
    inventoryPage.inventoryContainer.should('be.visible');
    inventoryPage.itemCards.should('have.length.greaterThan', 0);
    inventoryPage.sortBy('Name (A to Z)');
    inventoryPage.getItemNames().then((names) => {
      const sorted = [...names].sort((a, b) => a.localeCompare(b));
      expect(names).to.deep.equal(sorted);
    });
  });

  it.skip('should sort items from Z to A for problem user', () => {
    cy.login('problem');
    cy.url().should('include', '/inventory.html');
    inventoryPage.inventoryContainer.should('be.visible');
    inventoryPage.itemCards.should('have.length.greaterThan', 0);
    inventoryPage.sortBy('Name (Z to A)');
    inventoryPage.getItemNames().then((names) => {
      const sorted = [...names].sort((a, b) => b.localeCompare(a));
      expect(names).to.deep.equal(sorted);
    });
  });

  it('should show error when accessing inventory after logout for problem user', () => {
    cy.login('problem');
    cy.url().should('include', '/inventory.html');
    inventoryPage.inventoryContainer.should('be.visible');
    inventoryPage.itemCards.should('have.length.greaterThan', 0);
    inventoryPage.burgerMenu().should('be.visible').click();
    inventoryPage.logoutButton().should('be.visible').click();
    cy.visit('/inventory.html', { failOnStatusCode: false });
    cy.get('[data-test="error"]').should('contain.text', "Epic sadface: You can only access '/inventory.html' when you are logged in.")
      .should('be.visible');
  });
  });

  describe('Glitch user Scenarios', () => {

  it('should display list of inventory items with name, price, and Add to cart button for glitch user', () => {
    cy.login('glitch');
    cy.url().should('include', '/inventory.html');
    inventoryPage.inventoryContainer.should('be.visible');
    inventoryPage.itemCards.should('have.length.greaterThan', 0);

    inventoryPage.itemCards.each(($el) => {
      cy.wrap($el).find('.inventory_item_name').should('be.visible');
      cy.wrap($el).find('.inventory_item_price').should('be.visible');
      cy.wrap($el).find('button').should('contain.text', 'Add to cart');
    });
  });

  it('should navigate to item detail page when clicking an item for glitch user', () => {
    cy.login('glitch');
    cy.url().should('include', '/inventory.html');
    inventoryPage.inventoryContainer.should('be.visible');
    inventoryPage.itemCards.should('have.length.greaterThan', 0);
    inventoryPage.openFirstItem();
    cy.url().should('include', '/inventory-item');
    cy.get('.inventory_details_name').should('be.visible');
  });

  it('should add first item to the cart and update cart badge for glitch user', () => {
    cy.login('glitch');
    cy.url().should('include', '/inventory.html');
    inventoryPage.inventoryContainer.should('be.visible');
    inventoryPage.itemCards.should('have.length.greaterThan', 0);
    inventoryPage.addFirstItemToCart();
    cy.get('.shopping_cart_badge').should('contain.text', '1');
  });

  it('should sort items by price low to high for glitch user', () => {
    cy.login('glitch');
    cy.url().should('include', '/inventory.html');
    inventoryPage.inventoryContainer.should('be.visible');
    inventoryPage.itemCards.should('have.length.greaterThan', 0);
    inventoryPage.sortBy('Price (low to high)');
    inventoryPage.getItemPrices().then((prices) => {
      const sorted = [...prices].sort((a, b) => a - b);
      expect(prices).to.deep.equal(sorted);
    });
  });

  it('should sort items by price high to low for glitch user', () => {
    cy.login('glitch');
    cy.url().should('include', '/inventory.html');
    inventoryPage.inventoryContainer.should('be.visible');
    inventoryPage.itemCards.should('have.length.greaterThan', 0);
    inventoryPage.sortBy('Price (high to low)');
    inventoryPage.getItemPrices().then((prices) => {
      const sorted = [...prices].sort((a, b) => b - a);
      expect(prices).to.deep.equal(sorted);
    });
  });

  it('should sort items from A to Z for glitch user', () => {
    cy.login('glitch');
    cy.url().should('include', '/inventory.html');
    inventoryPage.inventoryContainer.should('be.visible');
    inventoryPage.itemCards.should('have.length.greaterThan', 0);
    inventoryPage.sortBy('Name (A to Z)');
    inventoryPage.getItemNames().then((names) => {
      const sorted = [...names].sort((a, b) => a.localeCompare(b));
      expect(names).to.deep.equal(sorted);
    });
  });

  it('should sort items from Z to A for glitch user', () => {
    cy.login('glitch');
    cy.url().should('include', '/inventory.html');
    inventoryPage.inventoryContainer.should('be.visible');
    inventoryPage.itemCards.should('have.length.greaterThan', 0);
    inventoryPage.sortBy('Name (Z to A)');
    inventoryPage.getItemNames().then((names) => {
      const sorted = [...names].sort((a, b) => b.localeCompare(a));
      expect(names).to.deep.equal(sorted);
    });
  });

  it('should show error when accessing inventory after logout for glitch user', () => {
    cy.login('glitch');
    cy.url().should('include', '/inventory.html');
    inventoryPage.inventoryContainer.should('be.visible');
    inventoryPage.itemCards.should('have.length.greaterThan', 0);
    inventoryPage.burgerMenu().should('be.visible').click();
    inventoryPage.logoutButton().should('be.visible').click();
    cy.visit('/inventory.html', { failOnStatusCode: false });
    cy.get('[data-test="error"]').should('contain.text', "Epic sadface: You can only access '/inventory.html' when you are logged in.")
      .should('be.visible');
  });
  });

});
