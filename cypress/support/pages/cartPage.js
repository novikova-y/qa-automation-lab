class CartPage {
  get cartItems() {
    return cy.get('.cart_item');
  }

  get checkoutButton() {
    return cy.get('[data-test="checkout"]');
  }

  get continueShoppingButton() {
    return cy.get('[data-test="continue-shopping"]');
  }

  get removeButtons() {
    return cy.get('.cart_button');
  }

  visit() {
    cy.visit('/cart.html');
  }

  removeItemByName(itemName) {
    this.cartItems.contains(itemName).parent().find('button').click();
  }
}

export const cartPage = new CartPage();
