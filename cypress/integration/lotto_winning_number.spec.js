/// <reference types="cypress" />

describe('LOTTO - 당첨번호 입력 및 상금확인 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  it('로또 구매를 완료할 경우, 당첨 번호 입력 UI를 화면에 출력한다.', () => {
    cy.get('#lotto-purchase-input').type('1500');
    cy.get('#lotto-purchase-btn').click();

    cy.get('#lotto-winning-number-input-container').should('be.visible');
  });

  it('결과 확인하기 버튼을 누르면, 모달이 화면에 출력한다.', () => {
    let count = 1;
    cy.get('#lotto-purchase-input').type('1500');
    cy.get('#lotto-purchase-btn').click();

    cy.get('.winning-number')
      .each(elem => {
        cy.wrap(elem).type(count++);
      })
      .then(() => {
        cy.get('.bonus-number').type(count);
      });
    cy.get('.open-result-modal-button').click();

    cy.get('.modal').should('be.visible');
  });

  //   it('결과 확인하기 버튼을 누르면, 당첨 통계/수익률을 모달로 확인할 수 있다.', () => {
  //     cy.get('#lotto-purchase-input').type('1500');
  //     cy.get('#lotto-purchase-btn').click();

  //     cy.get('.open-result-modal-button').click();

  //   });
});
