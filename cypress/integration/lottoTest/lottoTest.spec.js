describe('로또 게임 테스트', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/');
  });

  it('프로그램을 시작하면 구입금액 입력폼만 보인다.', () => {
    cy.get('#input-price').should('be.visible');
    cy.get('#purchased-lottos').should('not.be.visible');
    cy.get('#input-lotto-nums').should('not.be.visible');
  });
});
