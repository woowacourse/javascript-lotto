context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/');
  });

  it('구입 금액을 입력받아 티켓을 생성한다.', () => {
    cy.get('#payment-input').type('5000');
    cy.get('#payment-submit').click();
    cy.get('.ticket').should('have.length', 5);
  });

  // it('토글 버튼을 누르면 티켓의 번호를 보여주는 것을 테스트한다.', () => {
  //   cy.get('.action-email')
  //     .type('fake@email.com')
  //     .should('have.value', 'fake@email.com');
  // });

  // it('구입 금액을 입력받아 티켓을 생성하는 것을 테스트한다.', () => {
  //   // https://on.cypress.io/type
  //   cy.get('.action-email')
  //     .type('fake@email.com')
  //     .should('have.value', 'fake@email.com');
  // });
});
