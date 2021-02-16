/// <reference types="cypress" />

context('lottoUI', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500');
  });

  it('로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급한다.', () => {
    const money = 3000;
    cy.get('.money-input').type(money);
    cy.get('.money-input-button').click();
    cy.get('.lotto-ticket').should('have.length', Math.floor(money / 1000));
  });
});