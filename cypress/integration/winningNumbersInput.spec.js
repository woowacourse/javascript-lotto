describe('당첨번호 입력 검사', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  it('6개의 당첨번호와 1개의 보너스 번호가 모두 정상입력되기 전까지 결과확인하기 버튼이 비활성화 되어 있다.', () => {
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    cy.get('.open-result-modal-button').should('be.disabled');
    cy.get('.winning-number').each(($el, index) => {
      cy.wrap($el).type(winningNumbers[index]);
      cy.get('.open-result-modal-button').should('be.disabled');
    });
    cy.get('.bonus-number').type(bonusNumber);
    cy.get('.open-result-modal-button').should('not.be.disabled');
  });
});
