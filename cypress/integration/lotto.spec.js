describe('racing-game', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  it('구입 금액에 3000원을 입력 시, 로또 3개가 자동으로 구입되야 한다.', () => {
    cy.get('#purchase-price-input-form__input').type(3000);
    cy.get('#purchase-price-input-form__button').click();

    cy.get('#purchase-result-section__label').should(
      'have.text',
      '총 3개를 구매하였습니다.',
    );
    cy.get('.purchase-result-section__lotto-icon')
      .its(length)
      .then((lottoIconAmount) => expect(lottoIconAmount).to.equal(3));
  });
});
