import { SELECTOR, MESSAGE, GAME, LOTTO } from '../../src/constants.js';
import { getKRMoneyString } from '../../src/utils/format.js';

const depositMoney = (money) => {
  cy.get(SELECTOR.DEPOSIT_INPUT).type(money);
  cy.get(SELECTOR.DEPOSIT_BUTTON).click();
};

const inputCorrectNumbers = (...numbers) => {
  numbers.forEach((number, i) => {
    cy.get(SELECTOR.CORRECT_NUMBER_INPUT).eq(i).type(number);
  });
};

const inputBonusNumber = (bonusNumber) => {
  cy.get(SELECTOR.CORRECT_NUMBER_INPUT_BONUS).type(bonusNumber);
};

describe('금액 추가', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5501');
    cy.window()
      .then((win) => cy.stub(win, 'alert'))
      .as('alertStub');
  });

  it('금액이 알맞게 추가되는지 검사', () => {
    const firstMoney = 3500;
    depositMoney(firstMoney);
    cy.get(SELECTOR.DEPOSIT_PRESENTER).should('have.text', getKRMoneyString(firstMoney));
    const secondMoney = 1500;
    depositMoney(secondMoney);
    cy.get(SELECTOR.DEPOSIT_PRESENTER).should(
      'have.text',
      getKRMoneyString(firstMoney + secondMoney)
    );
  });

  it('금액으로 음수를 넣을 수 없음', () => {
    const money = -3500;
    depositMoney(money);
    cy.get(SELECTOR.DEPOSIT_PRESENTER).should(
      'have.text',
      GAME.INITIAL_DEPOSIT
    );
    cy.get('@alertStub').should('be.calledWith', MESSAGE.SHOULD_MORE_THAN_ZERO);
  });

  it('금액으로 0을 넣을 수 없음', () => {
    const money = 0;
    depositMoney(money);
    cy.get(SELECTOR.DEPOSIT_PRESENTER).should(
      'have.text',
      GAME.INITIAL_DEPOSIT
    );
    cy.get('@alertStub').should('be.calledWith', MESSAGE.SHOULD_MORE_THAN_ZERO);
  });

  it('금액이 소수점을 포함할 수 없음', () => {
    const money = 3500.12;
    depositMoney(money);
    cy.get(SELECTOR.DEPOSIT_PRESENTER).should(
      'have.text',
      GAME.INITIAL_DEPOSIT
    );
    cy.get('@alertStub').should('be.calledWith', MESSAGE.SHOULD_BE_INTERGER);
  });
});

describe('자동 구매', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5501');
    cy.window()
      .then((win) => cy.stub(win, 'alert'))
      .as('alertStub');
  });

  it('금액에 맞게 로또들이 자동구매 됨', () => {
    const money = 3000;
    depositMoney(money);
    cy.get(SELECTOR.AUTO_PURCHASE_BUTTON).click();
    cy.get(SELECTOR.RESULT_ITEM_COUNT).should('have.text', '3');
    cy.get(SELECTOR.LOTTO_ITEM).should('have.length', '3');
  });

  it('자동 구매 후 거스름돈이 그대로 남는지 검사', () => {
    const money = 3500;
    depositMoney(money);
    cy.get(SELECTOR.AUTO_PURCHASE_BUTTON).click();
    cy.get(SELECTOR.DEPOSIT_PRESENTER).should('have.text', money % LOTTO.PRICE);
  });

  it(`남은 돈이 ${LOTTO.PRICE} 미만이라면 로또를 자동 구매할 수 없음`, () => {
    const money = 500;
    depositMoney(money);
    cy.get(SELECTOR.AUTO_PURCHASE_BUTTON).click();
    cy.get('@alertStub').should('be.calledWith', MESSAGE.NOT_ENOUGH_MONEY);
  });
});

describe('당첨번호 입력', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5501');
    cy.window()
      .then((win) => cy.stub(win, 'alert'))
      .as('alertStub');
  });

  it(`남은 돈이 ${LOTTO.PRICE} 미만이라면 로또를 자동 구매할 수 없음`, () => {
    const money = 500;
    depositMoney(money);
    cy.get(SELECTOR.AUTO_PURCHASE_BUTTON).click();
    cy.get('@alertStub').should('be.calledWith', MESSAGE.NOT_ENOUGH_MONEY);
    cy.get(SELECTOR.DEPOSIT_PRESENTER).should('have.text', money);
  });
});

describe('결과 확인', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5501');
    cy.window()
      .then((win) => cy.stub(win, 'alert'))
      .as('alertStub');
  });

  it(`결과 확인 버튼을 누르면 게임 결과를 확인할 수 있음`, () => {
    const money = 50000;
    depositMoney(money);
    cy.get(SELECTOR.AUTO_PURCHASE_BUTTON).click();
    inputCorrectNumbers(1, 2, 3, 4, 5, 6);
    inputBonusNumber(7);
    cy.get(SELECTOR.MODAL_OPEN_BUTTON).click();
    cy.get(SELECTOR.MODAL).should('be.visible');
  });
  
});

describe('게임 다시 시작', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5501');
    cy.window()
      .then((win) => cy.stub(win, 'alert'))
      .as('alertStub');
  });

  it(`다시 시작하기 버튼을 누르면, 로또게임이 초기화됨`, () => {
    const money = 50000;
    depositMoney(money);
    cy.get(SELECTOR.AUTO_PURCHASE_BUTTON).click();
    inputCorrectNumbers(1, 2, 3, 4, 5, 6);
    inputBonusNumber(7);
    cy.get(SELECTOR.MODAL_OPEN_BUTTON).click();
    cy.get(SELECTOR.RESTART_BUTTON).click();
    cy.get(SELECTOR.DEPOSIT_INPUT).should('have.value', '');
    cy.get(SELECTOR.RESULT).should('not.be.visible');
    cy.get(SELECTOR.CORRECT_NUMBER).should('not.be.visible');
    cy.get(SELECTOR.MODAL).should('not.be.visible');
  });
});
