/// <reference types="cypress" />

describe('LOTTO - 구매한 로또 화면 출력 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  it('로또 구매를 완료할 경우, 구매한 로또의 총 개수를 화면에 출력한다.', () => {
    cy.get('#lotto-perchase-input').type('1500');
    cy.get('#lotto-perchase-btn').click();

    cy.get('[data-test=total-lotto-count] > b').should('have.text', '1');
  });

  it('로또 구매를 완료할 경우, 수량에 맞는 로또를 화면에 출력한다.', () => {
    cy.get('#lotto-perchase-input').type('1500');
    cy.get('#lotto-perchase-btn').click();
    cy.get('#lotto-display-container > [data-test=lotto]')
      .its('length')
      .should('eq', 1);
  });

  it('번호 보기 토글 버튼을 클릭한 경우, 각 로또의 숫자들을 로또 이모지 우측에 토글한다.', () => {
    cy.get('#lotto-perchase-input').type('1500');
    cy.get('#lotto-perchase-btn').click();

    cy.get('[data-test=lotto-numbers]').should('not.exist');

    cy.get('.lotto-numbers-toggle-button').check({ force: true });
    cy.get('[data-test=lotto-numbers]').its('length').should('eq', 1);
  });
});
