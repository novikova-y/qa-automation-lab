class InventoryPage {
  get inventoryContainer() {
    return cy.get('.inventory_list');
  }

  get itemNames() {
    return cy.get('.inventory_item_name');
  }

  openFirstItem() {
    this.itemNames.first().click();
  }
}

export const inventoryPage = new InventoryPage();
