import LottoRankController from '../../../src/js/controllers/LottoRankController.js';
import { LOTTO_NUMBERS } from '../../../src/js/utils/constants.js';
import { calculateEarningRate, getRandomNumber } from '../../../src/js/utils/utils.js';

describe('로또 게임 테스트', () => {
  before(() => {
    cy.visit('http://127.0.0.1:8080/');
  });

  const price = 10000;
  const lottoTotalCount = price / LOTTO_NUMBERS.LOTTO_UNIT;

  it('프로그램을 시작하면, 금액 입력을 해야한다.', () => {
    cy.get('#input-price-form').should('be.visible');

    cy.get('#purchase-lottos').should('not.be.visible');
    cy.get('#mixed-purchase').should('not.be.visible');
    cy.get('#purchased-lotto-result').should('not.be.visible');
    cy.get('#input-winning-lotto-nums').should('not.be.visible');
  });

  it('금액을 입력하면, 사용자는 구매 방법을 선택할 수 있다', () => {
    cy.get('#input-price').type(price);
    cy.get('#input-price-btn').click();
    cy.get('#mixed-purchase-btn').should('be.visible');
    cy.get('#auto-purchase-btn').should('be.visible');

    cy.get('#mixed-purchase').should('not.be.visible');
    cy.get('#purchased-lotto-result').should('not.be.visible');
    cy.get('#input-winning-lotto-nums').should('not.be.visible');
  });

  it('혼합구매 버튼을 선택하면, 수동으로 번호를 입력할 수 있다.', () => {
    cy.get('#mixed-purchase-btn').click();

    cy.get('#mixed-purchase').should('be.visible');
    cy.get('#purchased-lotto-result').should('not.be.visible');
    cy.get('#input-winning-lotto-nums').should('not.be.visible');
  });
});
