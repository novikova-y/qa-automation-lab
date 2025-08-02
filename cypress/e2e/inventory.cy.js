import { loginPage } from '../support/pages/loginPage';
import { inventoryPage } from '../support/pages/inventoryPage';

describe('Inventory Page Tests', () => {
  beforeEach(() => {
    cy.fixture('users').then(({ standard }) => {
      loginPage.visit();
      loginPage.login(standard.username, standard.password);
    });
  });

  it('should display list of inventory items', () => {
    cy.url().should('include', '/inventory.html');
    inventoryPage.inventoryContainer.should('be.visible');
    inventoryPage.itemNames.should('have.length.greaterThan', 0);
  });

  it('should navigate to item detail page when clicking an item', () => {
    inventoryPage.openFirstItem();
    cy.url().should('include', '/inventory-item');
    cy.get('.inventory_details_name').should('be.visible');
  });
});
