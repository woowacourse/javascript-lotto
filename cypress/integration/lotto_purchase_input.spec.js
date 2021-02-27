/// <reference types="cypress" />

import { ERROR_MESSAGE } from '../../src/js/utils/message.js';

describe('LOTTO - 구매할 금액 입력 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  it('수동구매를 클릭할 경우, 수동 로또 번호 입력란이 출력된다.', () => {
    cy.get('#lotto-purchase-input').type('1000');
    cy.get('.purchase-type-toggle-button').click({ force: true });
    cy.get('#lotto-purchase-btn').click();
    cy.get('#manual-lotto-input-container').should('to.be.visible');
  });

  it('금액이 1000원 미만으로 입력된 경우, 확인 버튼이 disabled 상태 및 에러메시지가 화면에 출력된다.', () => {
    cy.get('#lotto-purchase-input').type('100');
    cy.get('#lotto-purchase-btn').should('be.disabled');
    cy.get('[data-section=messageBox').should(
      'have.text',
      ERROR_MESSAGE.PAYMENT_AMOUNT,
    );
  });

  it('금액이 소수로 입력된 경우, 확인 버튼이 disabled 상태 및 에러메시지가 화면에 출력된다.', () => {
    cy.get('#lotto-purchase-input').type('100.2');
    cy.get('#lotto-purchase-btn').should('be.disabled');
    cy.get('[data-section=messageBox').should(
      'have.text',
      ERROR_MESSAGE.NOT_INTEGER_NUMBER,
    );
  });
});
