import {
  LOTTO_PRICE,
  PURCHASED_QUANTITY_MESSAGE,
} from '../../src/js/constants.js';

describe('구매한 로또 UI 검사', () => {
  before(() => {
    cy.visit('http://localhost:5500/');
  });

  const numOfLotto = 5;

  it('입력된 로또 구입 금액으로 발급한 로또를 화면에 표시한다.', () => {
    cy.get('.purchase-amount-input').type(LOTTO_PRICE * numOfLotto);
    cy.get('.purchase-amount-button').click();
    cy.get('.purchased-lotto-section').should('be.visible');
    cy.get('.purchased-lotto-label').should(
      'have.text',
      PURCHASED_QUANTITY_MESSAGE(numOfLotto)
    );
    cy.get('.lotto-ticket-container').should('have.length', numOfLotto);
  });
});
