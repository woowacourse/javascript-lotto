import { ERROR_MESSAGE, SELECTOR } from '../../src/js/constants';

describe('조건에 맞는 구입할 금액을 입력한 경우, 성공 케이스', () => {
  const input = 3000;

  beforeEach(() => {
    cy.visit('/index.html');
  });

  it('구입할 금액을 조건에 맞게 입력 후 구입 버튼을 누르면, 구입한 로또 갯수를 확인할 수 있다.', () => {
    cy.paymentFormSubmit(input, () => {
      cy.get(SELECTOR.PURCHASED_TOTAL_COUNT).should(
        'text',
        '총 3개를 구매하였습니다.'
      );
    });
  });

  it('구입할 금액을 조건에 맞게 입력 후 구입 버튼을 누르면, 지난주 당첨 번호 영역이 보여진다.', () => {
    cy.paymentFormSubmit(input, () => {
      cy.get(SELECTOR.LAST_WEEK_WINNING_NUMBER_SECTION).should('be.visible');
    });
  });

  it('구입할 금액을 조건에 맞게 입력 후 구입 버튼을 누르면, 결과 확인하기 버튼이 보여진다', () => {
    cy.paymentFormSubmit(input, () => {
      cy.get(SELECTOR.RESULT_CHECKING_BUTTON).should('be.visible');
    });
  });

  it('구입할 금액을 조건에 맞게 입력한 후 구입 버튼을 누르면, 구입 버튼이 비활성화 된다.', () => {
    cy.paymentFormSubmit(input, () => {
      cy.get(SELECTOR.PAYMENT_BUTTON).should('be.disabled');
    });
  });
});

describe('조건에 맞지않는 구입할 금액을 입력한 경우, 실패 케이스', () => {
  beforeEach(() => {
    cy.visit('/index.html');
  });

  it('1000원 미만의 구입할 금액을 입력하고 구입 버튼을 눌렀을 때 에러메시지를 보여준다.', () => {
    const input = -1;

    cy.checkAlertMessage({
      input,
      inputSelector: SELECTOR.PAYMENT_INPUT,
      buttonSelector: SELECTOR.PAYMENT_BUTTON,
      errorMessage: ERROR_MESSAGE.MONEY_OUT_OF_RANGE,
    });
    cy.initializeInput(SELECTOR.PAYMENT_INPUT);
  });

  it('1000원 단위가 아닌 구입할 금액을 입력하고 구입 버튼을 눌렀을 때 에러메시지를 보여준다.', () => {
    const input = 1001;

    cy.checkAlertMessage({
      input,
      inputSelector: SELECTOR.PAYMENT_INPUT,
      buttonSelector: SELECTOR.PAYMENT_BUTTON,
      errorMessage: ERROR_MESSAGE.MONEY_OUT_OF_STANDARD,
    });
    cy.initializeInput(SELECTOR.PAYMENT_INPUT);
  });
});

describe('번호 보기 버튼을 활성화/비활성화 한 경우', () => {
  const input = 3000;

  beforeEach(() => {
    cy.visit('/index.html');

    cy.get(SELECTOR.PAYMENT_INPUT).type(input);
    cy.get(SELECTOR.PAYMENT_BUTTON).click();
  });

  it('번호 보기 버튼을 활성화하면 사용자가 구매한 로또 번호를 확인할 수 있다.', () => {
    cy.get(SELECTOR.LOTTO_LIST_TOGGLE_BUTTON)
      .click()
      .then(() => {
        cy.get(SELECTOR.LOTTO_NUMBER).should('be.visible');
      });
  });

  it('번호 보기 버튼을 비활성화하면 사용자가 구매한 로또 번호가 가려진다', () => {
    cy.get(SELECTOR.LOTTO_LIST_TOGGLE_BUTTON).click();

    cy.get(SELECTOR.LOTTO_LIST_TOGGLE_BUTTON)
      .click()
      .then(() => {
        cy.get(SELECTOR.LOTTO_NUMBER).should('be.not.visible');
      });
  });
});
