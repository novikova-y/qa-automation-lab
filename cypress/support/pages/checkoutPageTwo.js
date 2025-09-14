class CheckoutPageTwo {
  // Cart items
  getItemQuantity() {
    return cy.get('[data-test="item-quantity"]');
  }

  getItemName() {
    return cy.get('[data-test="inventory-item-name"]');
  }

  getItemPrice() {
    return cy.get('[data-test="inventory-item-price"]');
  }

  // Payment information
  getPaymentValue() {
    return cy.get('[data-test="payment-info-value"]');
  }

  // Shipping information
  getShippingValue() {
    return cy.get('[data-test="shipping-info-value"]');
  }

  // Summary
  getSubtotalLabel() {
    return cy.get('[data-test="subtotal-label"]');
  }

  getTaxLabel() {
    return cy.get('[data-test="tax-label"]');
  }

  getTotalLabel() {
    return cy.get('[data-test="total-label"]');
  }

  // Action buttons
  getCancelButton() {
    return cy.get('[data-test="cancel"]');
  }

  getFinishButton() {
    return cy.get('[data-test="finish"]');
  }

  // Actions
  clickCancel() {
    this.getCancelButton().click();
  }

  clickFinish() {
    this.getFinishButton().click();
  }
}

export const checkoutPageTwo = new CheckoutPageTwo();
