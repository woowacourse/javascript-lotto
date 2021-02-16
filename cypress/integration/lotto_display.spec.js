/// <reference types="cypress" />

describe('LOTTO - 구매한 로또 화면 출력 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  it('로또 구매를 완료할 경우, 수량에 맞는 로또를 화면에 출력한다.', () => {
    cy.get('#lotto-perchase-input').type('1500');
    cy.get('#lotto-perchase-btn').click();
    cy.get('#lotto-display-container > [data-test=lotto]')
      .its('length')
      .should('eq', 1);
  });
});
