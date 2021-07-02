import { ALERT_MESSAGE } from '../../src/js/constants.js';

describe('LOTTO 당첨번호 입력 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  it('당첨 번호를 입력할 때, 2자리 숫자가 입력되면, 자동으로 다음 폼으로 focus되는지 확인한다.', () => {
    const winningNumbers = [10, 11, 30, 25, 21, 20];
    cy.get('#money-input').type('10000');
    cy.get('#money-submit-button').click();
    cy.get('#lotto-numbers-auto-button').click();

    cy.get('.winning-number').each((winningNumberInput, index) => {
      cy.wrap(winningNumberInput)
        .should('have.value', '')
        .and('be.focused')
        .type(winningNumbers[index]);
    });
    cy.get('.bonus-number').should('have.value', '').and('be.focused').type(45);
  });

  it('입력된 당첨 번호가 중복되면 경고창을 띄운다.', () => {
    const winningNumbers = [9, 11, 9, 1, 21, 45];
    const bonusNumber = 10;
    const alertStub = cy.stub();

    cy.get('#money-input').type('10000');
    cy.get('#money-submit-button').click();
    cy.get('#lotto-numbers-auto-button').click();

    cy.get('.winning-number').each((winningNumberInput, index) => {
      cy.wrap(winningNumberInput).type(winningNumbers[index]);
    });

    cy.get('.bonus-number').type(bonusNumber);

    cy.on('window:alert', alertStub);
    cy.get('.open-result-modal-button')
      .click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(ALERT_MESSAGE.INVALID_WINNING_NUMBER_INPUT);
      });
  });
});
