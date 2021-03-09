import { ERROR_MESSAGE } from '../../src/js/utils/constant.js';

describe('racing-game', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
    cy.window().then((win) => cy.stub(win, 'alert').as('windowAlert'));
  });

  const typePurchasePriceAndClickSubmitButton = (purchasePrice = 5000) => {
    cy.get('#purchase-price-input-form__input').type(purchasePrice);
    cy.get('#purchase-price-input-form__button').click();
  };

  const typeSelfNumbersAndClickSubmitButton = (
    inputNumbers = [2, 8, 14, 20, 26, 32],
  ) => {
    cy.get('.self-number').then((selfNumbers) => {
      [...selfNumbers].forEach((selfNumber) => {
        cy.wrap(selfNumber).type(inputNumbers.shift());
      });
    });
    cy.get('#purchase-modal__self-input-form__button').click();
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
    cy.get('#winning-number-input-form__button').click();
  };

  const playLottoGame = (inputNumbers) => {
    typePurchasePriceAndClickSubmitButton();
    cy.get('#purchase-modal__auto-input-form__button').click();
    typeWinningNumbersAndClickShowResultButton(inputNumbers);
  };

  it('구입 금액을 입력 시, 로또 구매 모달이 나타나야한다.', () => {
    typePurchasePriceAndClickSubmitButton();
    cy.get('#purchase-modal').should('be.visible');
  });

  it('수동으로 번호를 입력하면 입력한 번호를 확인할 수 있어야 한다.', () => {
    typePurchasePriceAndClickSubmitButton();
    typeSelfNumbersAndClickSubmitButton();

    cy.get('#purchase-modal__self-result-section__table')
      .children('tbody')
      .its('length')
      .then((len) => {
        expect(len).to.equal(1);
      });
  });

  it('총 구매 가능한 갯수보다 더 많은 수동 입력시, 경고 메시지가 출력되야 한다.', () => {
    typePurchasePriceAndClickSubmitButton(1000);
    typeSelfNumbersAndClickSubmitButton();
    typeSelfNumbersAndClickSubmitButton();

    cy.get('@windowAlert').should(
      'be.calledWith',
      ERROR_MESSAGE.LOTTO.OVER_PURCHASE,
    );
  });

  it('구로또 구매 모달에서 자동 구매를 누르면 로또가 자동으로 구입되야 한다.', () => {
    typePurchasePriceAndClickSubmitButton(3000);
    cy.get('#purchase-modal__auto-input-form__button').click();

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
    typePurchasePriceAndClickSubmitButton(-1);

    cy.get('@windowAlert').should(
      'be.calledWith',
      ERROR_MESSAGE.LOTTO.INVALID_PRICE,
    );
  });

  it('"번호보기" 토글 버튼 클릭시 구매한 로또의 번호를 볼 수 있어야 한다.', () => {
    typePurchasePriceAndClickSubmitButton();
    cy.get('#purchase-modal__auto-input-form__button').click();

    cy.get('#purchase-result-section__toggle').click({ force: true });
    cy.get('#purchase-result-section__row-align').should('not.be.visible');
    cy.get('#purchase-result-section__col-align').should('be.visible');

    cy.get('#purchase-result-section__toggle').click({ force: true });
    cy.get('#purchase-result-section__row-align').should('be.visible');
    cy.get('#purchase-result-section__col-align').should('not.be.visible');
  });

  it('"결과 확인" 버튼 클릭시 모달 창을 통해 로또의 결과를 볼 수 있어야 한다.', () => {
    playLottoGame();
  });

  it('"X" 버튼 클릭시 모달 창이 닫혀야 한다.', () => {
    playLottoGame();

    cy.get('.modal-close').click();
    cy.get('#result-modal').should('not.be.visible');
  });

  it('당첨 번호에 중복된 번호을 입력시, 경고 메시지가 출력되야 한다.', () => {
    playLottoGame([5, 5, 10, 15, 25, 30, 35]);

    cy.get('@windowAlert').should(
      'be.calledWith',
      ERROR_MESSAGE.WINNING_NUMBER.DUPLICATE,
    );
  });

  it('"1 ~ 45"가 아닌 번호를 입력시, 경고 메시지가 출력되야 한다.', () => {
    playLottoGame([5, 10, 15, 25, 30, 35, 50]);

    cy.get('@windowAlert').should(
      'be.calledWith',
      ERROR_MESSAGE.WINNING_NUMBER.OUT_OF_RANGE,
    );
  });

  it('"다시 시작하기" 버튼 클릭시 행운의 로또 초기 화면으로 돌아가야 한다.', () => {
    playLottoGame();
    cy.get('#result-modal').should('be.visible');

    cy.get('.result-modal__restart-button').click();
    cy.get('#result-modal').should('not.be.visible');
    cy.get('#purchase-result-section').should('not.be.visible');
    cy.get('#winning-number-input-form').should('not.be.visible');

    playLottoGame();
    cy.get('#result-modal').should('be.visible');
  });
});
