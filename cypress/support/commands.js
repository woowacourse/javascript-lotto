import { SELECTOR } from '../../src/js/constants';

Cypress.Commands.add('paymentFormSubmit', (input) => {
  cy.get(SELECTOR.PAYMENT_INPUT).type(input);
  cy.get(SELECTOR.PAYMENT_BUTTON).click();
});

Cypress.Commands.add(
  'checkAlertMessage',
  ({ input, inputSelector, buttonSelector, errorMessage }) => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get(inputSelector).type(input);
    cy.get(buttonSelector)
      .click()
      .then(() => {
        expect(alertStub).to.be.calledWith(errorMessage);
      });
  }
);

Cypress.Commands.add('initializeInput', (selector) => {
  cy.get(selector).should('have.value', '');
  cy.get(selector).should('have.focus');
});
