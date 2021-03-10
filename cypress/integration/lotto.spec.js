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

const purchaseCustomLotto = (...numbers) => {
  numbers.forEach((number, i) => {
    cy.get(SELECTOR.PURCHASE_INPUT).eq(i).type(number);
  });
  cy.get(SELECTOR.PURCHASE_BUTTON).click();
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
    cy.get(SELECTOR.DEPOSIT_PRESENTER).should(
      'have.text',
      getKRMoneyString(firstMoney)
    );
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

describe('수동 구매', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5501');
    cy.window()
      .then((win) => cy.stub(win, 'alert'))
      .as('alertStub');
  });

  it('수동으로 구매할 로또 번호를 입력 중에 입력한 로또 번호들 중 중복된 번호가 있는지 검사', () => {
    cy.get(SELECTOR.PURCHASE_INPUT).eq(0).type(1);
    cy.get(SELECTOR.PURCHASE_INPUT).eq(1).type(2);
    cy.get(SELECTOR.PURCHASE_INPUT).eq(2).type(2);
    cy.get(SELECTOR.PURCHASE_INPUT).eq(3).click();
    cy.get('@alertStub').should(
      'be.calledWith',
      MESSAGE.DUPLICATED_NUMBER_EXIST
    );
  });

  it(`수동으로 구매할 로또 번호를 입력 중에 입력한 로또 번호들 중 ${LOTTO.MIN_NUMBER} ~ ${LOTTO.MAX_NUMBER} 외의 번호가 있는지 검사`, () => {
    cy.get(SELECTOR.PURCHASE_INPUT).eq(0).type(1);
    cy.get(SELECTOR.PURCHASE_INPUT).eq(1).type(2);
    cy.get(SELECTOR.PURCHASE_INPUT).eq(2).type(55);
    cy.get(SELECTOR.PURCHASE_INPUT).eq(3).click();
    cy.get('@alertStub').should('be.calledWith', MESSAGE.NUMBER_RANGE_EXCEEDED);
  });

  it(`구매가 이루어질 때마다 입금한 금액에서 ${LOTTO.PRICE}원이 빠져나가는지 검사`, () => {
    const money = 3000;
    depositMoney(money);
    purchaseCustomLotto(1, 2, 3, 4, 5, 6);
    cy.get(SELECTOR.DEPOSIT_PRESENTER).should(
      'have.text',
      getKRMoneyString(2000)
    );
  });

  it(`구매가 이루어질 때마다 직접 입력한 번호대로 로또가 추가되는지 검사`, () => {
    const money = 3000;
    depositMoney(money);
    purchaseCustomLotto(1, 2, 3, 4, 5, 6);
    cy.get(SELECTOR.LOTTO_NUMBERS)
      .last()
      .should('have.text', '1, 2, 3, 4, 5, 6');
  });

  it(`구입할 로또의 번호가 모두 입력되지 않으면 수동 구매를 수행할 수 없음`, () => {
    const money = 3000;
    depositMoney(money);
    purchaseCustomLotto(1, 2, 3, 4, 5);
    cy.get('@alertStub').should(
      'be.calledWith',
      MESSAGE.SHOULD_INPUT_ALL_NUMBERS
    );
  });

  it(`입금된 총 금액이 ${LOTTO.PRICE} 미만일 때 수동 구매를 수행할 수 없음`, () => {
    const money = 500;
    depositMoney(money);
    purchaseCustomLotto(1, 2, 3, 4, 5, 6);
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

  it('당첨 번호를 입력 중에 입력한 로또 번호들 중 중복된 번호가 있는지 검사', () => {
    const money = 3000;
    depositMoney(money);
    purchaseCustomLotto(1, 2, 3, 4, 5, 6);
    cy.get(SELECTOR.CORRECT_NUMBER_INPUT).eq(0).type(1);
    cy.get(SELECTOR.CORRECT_NUMBER_INPUT).eq(1).type(2);
    cy.get(SELECTOR.CORRECT_NUMBER_INPUT_BONUS).type(2);
    cy.get(SELECTOR.CORRECT_NUMBER_INPUT).eq(2).click();
    cy.get('@alertStub').should(
      'be.calledWith',
      MESSAGE.DUPLICATED_NUMBER_EXIST
    );
  });

  it(`당첨 번호를 입력 중에 입력한 로또 번호들 중 ${LOTTO.MIN_NUMBER} ~ ${LOTTO.MAX_NUMBER} 외의 번호가 있는지 검사`, () => {
    const money = 3000;
    depositMoney(money);
    purchaseCustomLotto(1, 2, 3, 4, 5, 6);
    cy.get(SELECTOR.CORRECT_NUMBER_INPUT).eq(0).type(1);
    cy.get(SELECTOR.CORRECT_NUMBER_INPUT).eq(1).type(2);
    cy.get(SELECTOR.CORRECT_NUMBER_INPUT_BONUS).type(56);
    cy.get(SELECTOR.CORRECT_NUMBER_INPUT).eq(2).click();
    cy.get('@alertStub').should('be.calledWith', MESSAGE.NUMBER_RANGE_EXCEEDED);
  });
});

describe('결과 확인', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5501');
    cy.window()
      .then((win) => cy.stub(win, 'alert'))
      .as('alertStub');
    cy.window()
      .then((win) => cy.stub(win, 'confirm'))
      .as('confirmStub');
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

  it(`당첨 번호를 모두 입력하지 않았다면 결과를 확인할 수 없음`, () => {
    const money = 50000;
    depositMoney(money);
    cy.get(SELECTOR.AUTO_PURCHASE_BUTTON).click();
    inputCorrectNumbers(1, 2, 3, 4, 5);
    inputBonusNumber(7);
    cy.get(SELECTOR.MODAL_OPEN_BUTTON).click();
  });

  it(`남은 금액이 1000원 보다 적다면 남은 금액을 안내함`, () => {
    const firstMoney = 50000;
    depositMoney(firstMoney);
    cy.get(SELECTOR.AUTO_PURCHASE_BUTTON).click();
    const secondMoney = 700;
    depositMoney(secondMoney);
    inputCorrectNumbers(1, 2, 3, 4, 5, 6);
    inputBonusNumber(7);
    cy.get(SELECTOR.MODAL_OPEN_BUTTON).click();
    cy.get('@confirmStub').should(
      'be.calledWith',
      `현재 잔돈이 ${secondMoney}원 만큼 남아있습니다. 남은 돈을 모두 쓰고 싶으시면 ${LOTTO.PRICE}원 단위로 금액을 맞춰주세요`
    );
  });

  it(`남은 금액이 1000원 보다 많다면 남은 금액을 안내하며 자동 구매를 수행할지를 물어봄`, () => {
    const firstMoney = 50000;
    depositMoney(firstMoney);
    cy.get(SELECTOR.AUTO_PURCHASE_BUTTON).click();
    const secondMoney = 1700;
    depositMoney(secondMoney);
    inputCorrectNumbers(1, 2, 3, 4, 5, 6);
    inputBonusNumber(7);
    cy.get(SELECTOR.MODAL_OPEN_BUTTON).click();
    cy.get('@confirmStub').should(
      'be.calledWith',
      `현재 잔돈이 ${secondMoney}원 만큼 남아있습니다. 남은 돈으로 자동 구매를 수행할까요? 자동 구매 후에도 ${
        secondMoney % LOTTO.PRICE
      }원 만큼의 금액이 남습니다.`
    );
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
