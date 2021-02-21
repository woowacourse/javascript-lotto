export const checkAlert = alertMessage => {
  const alertStub = cy.stub();

  cy.on('window:alert', alertStub).then(() => {
    expect(alertStub.getCall(0)).to.be.calledWith(alertMessage);
  });
};

export const typeInputValue = (input, value) => {
  cy.get(input).then($input => $input.val(''));
  value !== '' && cy.get(input).type(value);
};

export const testInputValue = (button, alertMessage = '') => {
  cy.get(button).click();
  alertMessage && checkAlert(alertMessage);
  // cy.get(input).should('have.value', alertMessage ? '' : value);
};
