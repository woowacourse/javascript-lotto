import { ERR_MESSAGE } from '../../src/js/utils/constant.js';

describe('racing-game', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  const typePurchasePriceAndClickSubmitButton = (purchasePrice = 3000) => {
    cy.get('#purchase-price-input-form__input').type(purchasePrice);
    cy.get('#purchase-price-input-form__button').click();
  };

  const typeWinningNumbersAndClickShowResultButton = () => {
    let inputNumber = 5;

    cy.get('.winning-number').then((winningNumbers) => {
      [...winningNumbers].forEach((winningNumber) => {
        cy.wrap(winningNumber).type(inputNumber);
        inputNumber += 5;
      });
    });
    cy.get('.bonus-number').type(inputNumber);

    cy.get('.open-result-modal-button').click();
    cy.get('.modal').should('be.visible');
  };

  const playLottoGame = (purchasePrice) => {
    typePurchasePriceAndClickSubmitButton(purchasePrice);
    typeWinningNumbersAndClickShowResultButton();
  };

  it('구입 금액에 3000원을 입력 시, 로또 3개가 자동으로 구입되야 한다.', () => {
    typePurchasePriceAndClickSubmitButton();

    cy.get('#purchase-result-section__label').should(
      'have.text',
      '총 3개를 구매하였습니다.',
    );
    cy.get('#purchase-result-section__row-align')
      .children('span')
      .its('length')
      .then((len) => {
        expect(len).to.equal(3);
      });
  });

  it('구입 금액에 1000원 이하의 값을 입력 시, 경고 메시지가 출력되야 한다.', () => {
    cy.window().then((win) => cy.stub(win, 'alert').as('windowAlert'));

    typePurchasePriceAndClickSubmitButton(-1);

    cy.get('@windowAlert').should(
      'be.calledWith',
      ERR_MESSAGE.LOTTO.INVALID_PRICE,
    );
  });

  it('"번호보기" 토글 버튼 클릭시 구매한 로또의 번호를 볼 수 있어야 한다.', () => {
    typePurchasePriceAndClickSubmitButton(3000);

    cy.get('#purchase-result-section__toggle').click({ force: true });
    cy.get('#purchase-result-section__row-align').should('not.be.visible');
    cy.get('#purchase-result-section__col-align').should('be.visible');

    cy.get('#purchase-result-section__toggle').click({ force: true });
    cy.get('#purchase-result-section__row-align').should('be.visible');
    cy.get('#purchase-result-section__col-align').should('not.be.visible');
  });

  it('"결과 확인" 버튼 클릭시 모달 창을 통해 로또의 결과를 볼 수 있어야 한다.', () => {
    playLottoGame();

    cy.get('.modal-close').click();
    cy.get('.modal').should('not.be.visible');
  });

  it('"다시 시작하기" 버튼 클릭시 행운의 로또 초기 화면으로 돌아가야 한다.', () => {
    playLottoGame();

    cy.get('#resart-button').click();
    cy.get('.modal').should('not.be.visible');
    cy.get('#purchase-result-section').should('not.be.visible');
    cy.get('#winning-number-input-form').should('not.be.visible');

    playLottoGame(5000);
  });
});
