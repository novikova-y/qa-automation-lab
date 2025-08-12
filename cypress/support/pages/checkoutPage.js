class CheckoutPage {
  // Selectors
  get firstNameInput() {
    return cy.get('[data-test="firstName"]');
  }

  get lastNameInput() {
    return cy.get('[data-test="lastName"]');
  }

  get postalCodeInput() {
    return cy.get('[data-test="postalCode"]');
  }

  get continueButton() {
    return cy.get('[data-test="continue"]');
  }

  get finishButton() {
    return cy.get('[data-test="finish"]');
  }

  get cancelButton() {
    return cy.get('[data-test="cancel"]');
  }

  get summaryContainer() {
    return cy.get('.summary_info');
  }

  get successMessage() {
    return cy.get('.complete-header');
  }

  get errorMessage() {
    return cy.get('[data-test="error"]');
  }

  // Actions
  fillInformation(firstName, lastName, postalCode) {
    if (firstName) this.firstNameInput.clear().type(firstName);
    if (lastName) this.lastNameInput.clear().type(lastName);
    if (postalCode) this.postalCodeInput.clear().type(postalCode);
  }

  clickContinue() {
    this.continueButton.click();
  }

  clickFinish() {
    this.finishButton.click();
  }

  clickCancel() {
    this.cancelButton.click();
  }
}

export const checkoutPage = new CheckoutPage();
