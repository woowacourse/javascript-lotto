it('사용자가 구매한 티켓을 확인할 수 있다.', () => {
  cy.visit('/index.html');
  const input = 3000;

  cy.get('#payment-input').type(input);
  cy.get('#payment-button')
    .click()
    .then(() => {
      cy.get('.purchased-total-count').should(
        'text',
        '총 3개를 구매하였습니다.'
      );
    });
});

it('번호 보기 버튼을 누르면 사용자가 구매한 로또 번호를 확인할 수 있다.', () => {
  cy.visit('/index.html');
  const input = 3000;

  cy.get('#payment-input').type(input);
  cy.get('#payment-button').click();
  cy.get('#lotto-list-toggle-button')
    .click()
    .then(() => {
      cy.get('.lotto-number').should('be.visible');
    });
});
