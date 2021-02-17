describe('로또 게임 테스트', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/');
  });

  const price = 10000;
  const lottoTotalCount = price / 1000;

  it('프로그램을 시작하면 구입금액 입력폼만 보인다.', () => {
    cy.get('#input-price-form').should('be.visible');
    cy.get('#purchased-lottos').should('not.be.visible');
    cy.get('#input-lotto-nums').should('not.be.visible');
  });

  it('사용자는 로또 구입 금액을 입력하면, 사용자가 구매한 로또와 지난 주 당첨 로또 입력폼이 보인다.', () => {
    cy.get('#input-price').type(price);
    cy.get('#input-price-btn').click();
    cy.get('#purchased-lottos').should('be.visible');
    cy.get('#input-lotto-nums').should('be.visible');
  });

  it('사용자가 구매한 로또의 개수와 개수 만큼의 로또 이모지를 보여준다.', () => {
    cy.get('#input-price').type(price);
    cy.get('#input-price-btn').click();
    cy.get('#purchased-lottos').should('be.visible');
    cy.get('#total-purchased').should('have.text', lottoTotalCount);
    cy.get('#lotto-icons')
      .children('.lotto-wrapper')
      .should('have.length', lottoTotalCount);
    cy.get('#input-lotto-nums').should('be.visible');
  });

  it('번호 보기 스위치 off 상태에서는 로또 아이콘들이 가로로, on에서는 세로로 정렬된다.', () => {
    cy.get('#input-price').type(price);
    cy.get('#input-price-btn').click();

    cy.get('.switch').click();
    cy.get('#lotto-icons').should('have.class', 'flex-col');
    cy.get('.switch').click();
    cy.get('#lotto-icons').should('not.have.class', 'flex-col');
  });

  it('번호 보기 스위치가 off이면 구매한 로또의 번호가 보이지 않고, on이면 번호가 보인다.', () => {
    cy.get('#input-price').type(price);
    cy.get('#input-price-btn').click();

    cy.get('.switch').click();
    cy.get('#lotto-icons').should('have.class', 'flex-col');
    cy.get('#lotto-icons')
      .children('.lotto-wrapper')
      .should('have.length', lottoTotalCount);
    cy.get('.lotto-wrapper').children('.lotto-numbers').should('exist');

    cy.get('.switch').click();
    cy.get('#lotto-icons').should('not.have.class', 'flex-col');
    cy.get('#lotto-icons').children('.lotto-wrapper').should('not.exist');
    cy.get('.lotto-wrapper').children('.lotto-numbers').should('not.exist');
  });
});
