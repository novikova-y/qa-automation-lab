class InventoryPage {
  get inventoryContainer() {
    return cy.get('.inventory_list');
  }

  get itemNames() {
    return cy.get('.inventory_item_name');
  }

  get itemCards() {
    return cy.get('.inventory_item');
  }

  openFirstItem() {
    this.itemNames.first().click();
  }

  addFirstItemToCart() {
    this.itemCards.first().find('button').click();
  }

  sortBy(optionText) {
    cy.get('[data-test="product-sort-container"]').select(optionText);
  }

  getItemPrices() {
    return cy.get('.inventory_item_price').then(($prices) => {
      return Cypress.$.makeArray($prices).map((el) =>
        parseFloat(el.innerText.replace('$', ''))
      );
    });
  }
}

export const inventoryPage = new InventoryPage();
