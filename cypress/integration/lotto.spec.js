describe('LOTTO 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  it('사용자가 로또 구입 금액을 입력하고 확인 버튼을 누르면 금액에 맞는 로또가 화면에 보여진다.', () => {
    cy.get('.lotto-list-container').should('not.be.visible');
    cy.get('.winning-number-form-container').should('not.be.visible');

    cy.get('#money-input').type('10000');
    cy.get('#money-submit-button').click();

    cy.get('.lotto-list-container').should('be.visible');
    cy.get('.winning-number-form-container').should('be.visible');

    cy.get('.lotto-count').should('have.text', '10');
    cy.get('.lotto').should('have.length', '10');
  })
})