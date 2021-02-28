/// <reference types="cypress" />

describe('LOTTO - 모달 동작 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  it('결과 확인하기 버튼을 누르면, 모달을 화면에 출력한다.', () => {
    let count = 1;
    cy.get('#lotto-purchase-input').type('4500');
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

  it('모달이 출력된 상태에서 닫기(X)버튼을 클릭하면, 모달이 닫힌다.', () => {
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 40;

    cy.get('#lotto-purchase-input').type('4500');
    cy.get('#lotto-purchase-btn').click();
    cy.get('.winning-number')
      .each((elem, index) => {
        cy.wrap(elem).type(winningNumbers[index]);
      })
      .then(() => {
        cy.get('.bonus-number').type(bonusNumber);
      });

    cy.get('.open-result-modal-button').click();
    cy.get('.modal-close').click();
    cy.get('.modal').should('not.be.visible');
  });

  it('다시 시작하기 버튼을 누르면 초기화 되서 다시 구매를 시작할 수 있다.', () => {
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 40;

    cy.get('#lotto-purchase-input').type('4500');
    cy.get('#lotto-purchase-btn').click();
    cy.get('.winning-number')
      .each((elem, index) => {
        cy.wrap(elem).type(winningNumbers[index]);
      })
      .then(() => {
        cy.get('.bonus-number').type(bonusNumber);
      });

    cy.get('.open-result-modal-button').click();
    cy.get('#restart-btn').click();

    cy.get('#lotto-purchase-input').should('have.text', '');
    cy.get('#lotto-display-container').should('not.be.visible');
    cy.get('#lotto-winning-number-input-container').should('not.be.visible');
    cy.get('.modal').should('not.be.visible');
  });
});
