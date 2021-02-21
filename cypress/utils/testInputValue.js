export const checkAlert = alertMessage => {
  const alertStub = cy.stub();

  cy.on('window:alert', alertStub).then(() => {
    expect(alertStub.getCall(0)).to.be.calledWith(alertMessage);
  });
};

const resetInputValue = input => cy.get(input).then($input => $input.val(''));

export const setInputValue = (input, button, value) => {
  resetInputValue(input);

  if (value !== '') {
    cy.get(input).type(value);
  }

  cy.get(button).click();
};

export const testInputValue = (input, button, value, alertMessage = '') => {
  setInputValue(input, button, value);
  alertMessage && checkAlert(alertMessage);
  cy.get(input).should('have.value', alertMessage ? '' : value);
};
