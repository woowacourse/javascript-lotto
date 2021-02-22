import { LOTTO_PRICE, MONETARY_UNIT, PURCHASE_AMOUNT_ALERT_MESSAGE } from '../../src/js/constants.js';

describe('구매금액 입력 검사', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  it('입력된 로또 구입 금액에 화폐단위 미만의 자릿수가 포함된 경우 alert을 띄우고 input창을 초기화한다.', () => {
    const invalidMoney = MONETARY_UNIT / 10;
    const { PURCHASE_AMOUNT_IS_INVALID_MONEY } = PURCHASE_AMOUNT_ALERT_MESSAGE;
    const alertStub = cy.stub();

    cy.on('window:alert', alertStub);
    cy.get('.purchase-amount-input').type(invalidMoney);
    cy.get('.purchase-amount-button')
      .click()
      .then(() => {
        const actualMessage = alertStub.getCall(0).lastArg;
        expect(actualMessage).to.equal(PURCHASE_AMOUNT_IS_INVALID_MONEY);
      });
    cy.get('.purchase-amount-input').should('have.text', '');
    cy.get('.purchase-amount-input').should('have.focus');
  });

  it('입력된 로또 구입 금액이 로또 한 장의 금액보다 적을 경우 alert을 띄우고 input창을 초기화한다.', () => {
    const tooLowAmount = Math.floor(LOTTO_PRICE * 0.9);
    const { PURCHASE_AMOUNT_IS_TOO_LOW } = PURCHASE_AMOUNT_ALERT_MESSAGE;
    const alertStub = cy.stub();

    cy.on('window:alert', alertStub);
    cy.get('.purchase-amount-input').type(tooLowAmount);
    cy.get('.purchase-amount-button')
      .click()
      .then(() => {
        const actualMessage = alertStub.getCall(0).lastArg;
        expect(actualMessage).to.equal(PURCHASE_AMOUNT_IS_TOO_LOW);
      });
    cy.get('.purchase-amount-input').should('have.text', '');
    cy.get('.purchase-amount-input').should('have.focus');
  });

  it('입력된 로또 구입 금액이 로또 한 장의 금액으로 나누어 떨어지지 않을 경우 alert으로 거스름돈 금액을 알려주고 구매한 로또를 표시한다.', () => {
    const amountWithChange = Math.ceil(LOTTO_PRICE * 1.1);
    const { PURCHASE_AMOUNT_HAS_CHANGE } = PURCHASE_AMOUNT_ALERT_MESSAGE;
    const alertStub = cy.stub();

    cy.on('window:alert', alertStub);
    cy.get('.purchase-amount-input').type(amountWithChange);
    cy.get('.purchase-amount-button')
      .click()
      .then(() => {
        const change = amountWithChange % LOTTO_PRICE;
        const actualMessage = alertStub.getCall(0).lastArg;
        expect(actualMessage).to.equal(PURCHASE_AMOUNT_HAS_CHANGE(change));
      });
    cy.get('.purchased-lotto-section').should('be.visible');
  });
});
