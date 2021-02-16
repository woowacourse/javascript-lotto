import { ERR_MESSAGE } from '../../src/js/utils/constant.js';

describe('racing-game', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  const typePurchasePriceAndClickSubmitButton = (purchasePrice) => {
    cy.get('#purchase-price-input-form__input').type(purchasePrice);
    cy.get('#purchase-price-input-form__button').click();
  };

  it('구입 금액에 3000원을 입력 시, 로또 3개가 자동으로 구입되야 한다.', () => {
    typePurchasePriceAndClickSubmitButton(3000);

    cy.get('#purchase-result-section__label').should(
      'have.text',
      '총 3개를 구매하였습니다.',
    );
    cy.get('.purchase-result-section__lotto-icon')
      .its(length)
      .then((lottoIconAmount) => expect(lottoIconAmount).to.equal(3));
  });

  it('구입 금액에 3333원을 입력 시, 경고 메시지가 출력되야 한다.', () => {
    typePurchasePriceAndClickSubmitButton(3333);

    cy.window().then((win) => cy.stub(win, 'alert').as('windowAlert'));
    cy.get('@windowAlert').should(
      'be.calledWith',
      ERR_MESSAGE.LOTTO.INVALID_PRICE,
    );
  });
});
