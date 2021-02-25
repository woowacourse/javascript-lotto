import { ERR_MESSAGE } from '../../src/js/utils/constant.js';

describe('racing-game', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
    cy.window().then((win) => cy.stub(win, 'alert').as('windowAlert'));
  });

  const typePurchasePriceAndClickSubmitButton = (purchasePrice = 5000) => {
    cy.get('#purchase-price-input-form__input').type(purchasePrice);
    cy.get('#purchase-price-input-form__button').click();
  };

  const typeWinningNumbersAndClickShowResultButton = (
    inputNumbers = [5, 10, 15, 20, 25, 30, 35],
  ) => {
    cy.get('.winning-number').then((winningNumbers) => {
      [...winningNumbers].forEach((winningNumber) => {
        cy.wrap(winningNumber).type(inputNumbers.shift());
      });
    });
    cy.get('.bonus-number').type(inputNumbers.shift());
    cy.get('.open-result-modal-button').click();
  };

  const playLottoGame = (inputNumbers) => {
    typePurchasePriceAndClickSubmitButton();
    typeWinningNumbersAndClickShowResultButton(inputNumbers);
  };

  it('구입 금액에 1000원 이하의 값을 입력 시, 경고 메시지가 출력되야 한다.', () => {
    typePurchasePriceAndClickSubmitButton(-1);

    cy.get('@windowAlert').should(
      'be.calledWith',
      ERR_MESSAGE.LOTTO.INVALID_PRICE,
    );
  });

  it('구입 금액 입력 후 토글을 통해 수동 구매와 자동 구매를 선택할 수 있어야 한다.', () => {
    typePurchasePriceAndClickSubmitButton();

    cy.get('#auto-purchase-section').should('be.visible');

    cy.get('#purchase-section__toggle').click();
    cy.get('#auto-purchase-section').should('not.be.visible');
    cy.get('#manual-purchase-section').should('be.visible');
  });

  it('자동으로 로또를 구매한 후 남은 금액을 사용자에게 보여줘야 한다.', () => {
    typePurchasePriceAndClickSubmitButton();

    cy.get('#auto-purchase-section__submit').type(3);
    cy.get('#auto-purchase-section__button').click();

    cy.get('#purchase-section__budget').should('have.text', '2000원');
  });

  it('수동으로 로또를 구매한 후 남은 금액을 사용자에게 보여줘야 한다.', () => {
    typePurchasePriceAndClickSubmitButton();

    cy.get('#purchase-section__toggle').click();
    cy.get('#manual-purchase-section__submit').type(3);
    cy.get('#manual-purchase-section__button').click();

    cy.get('#purchase-section__budget').should('have.text', '2000원');
  });

  it('"번호보기" 토글 버튼 클릭시 구매한 로또의 번호를 볼 수 있어야 한다.', () => {
    typePurchasePriceAndClickSubmitButton();

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

  it('당첨 번호에 중복된 번호을 입력시, 경고 메시지가 출력되야 한다.', () => {
    playLottoGame([5, 5, 10, 15, 25, 30, 35]);

    cy.get('@windowAlert').should(
      'be.calledWith',
      ERR_MESSAGE.WINNING_NUMBER.DUPLICATE,
    );
  });

  it('"1 ~ 45"가 아닌 번호를 입력시, 경고 메시지가 출력되야 한다.', () => {
    playLottoGame([5, 10, 15, 25, 30, 35, 50]);

    cy.get('@windowAlert').should(
      'be.calledWith',
      ERR_MESSAGE.WINNING_NUMBER.OUT_OF_RANGE,
    );
  });

  it('"다시 시작하기" 버튼 클릭시 행운의 로또 초기 화면으로 돌아가야 한다.', () => {
    playLottoGame();
    cy.get('.modal').should('be.visible');

    cy.get('.restart-button').click();
    cy.get('.modal').should('not.be.visible');
    cy.get('#purchase-result-section').should('not.be.visible');
    cy.get('#winning-number-input-form').should('not.be.visible');

    playLottoGame();
    cy.get('.modal').should('be.visible');
  });
});
