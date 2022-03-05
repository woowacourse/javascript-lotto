import Store from '../flux/store';
import initialState from '../flux/initialState';

import MoneyForm from '../components/MoneyForm';
import WinningNumberForm from '../components/WinningNumberForm';

import { ERROR_MESSAGE, LOTTO, PRIZE_MONEY } from '../constants';
import { validateMoney, validateWinningNumber } from '../validation/validators';
import { calculateEarningsRate } from '../utils';

describe('금액 입력에 대한 유효성 검사를 한다.', () => {
  test('빈 입력값을 허용하지 않는다.', () => {
    const invalidMoney = '';
    expect(validateMoney(invalidMoney)).toHaveErrorMessage(ERROR_MESSAGE.EMPTY_MONEY);
  });

  test('숫자가 아닌 값을 허용하지 않는다.', () => {
    let invalidMoney = '1.2';
    expect(validateMoney(invalidMoney)).toHaveErrorMessage(ERROR_MESSAGE.NOT_INTEGER_MONEY);

    invalidMoney = '2ab2';
    expect(validateMoney(invalidMoney)).toHaveErrorMessage(ERROR_MESSAGE.NOT_INTEGER_MONEY);

    invalidMoney = '2   2';
    expect(validateMoney(invalidMoney)).toHaveErrorMessage(ERROR_MESSAGE.NOT_INTEGER_MONEY);
  });

  test('1000 미만의 값을 허용하지 않는다.', () => {
    let invalidMoney = '999';
    expect(validateMoney(invalidMoney)).toHaveErrorMessage(ERROR_MESSAGE.UNDER_MIN_MONEY);

    invalidMoney = '0';
    expect(validateMoney(invalidMoney)).toHaveErrorMessage(ERROR_MESSAGE.UNDER_MIN_MONEY);

    invalidMoney = '-1';
    expect(validateMoney(invalidMoney)).toHaveErrorMessage(ERROR_MESSAGE.UNDER_MIN_MONEY);
  });

  test('1000 단위로 나누어 떨어지지 않는 값을 허용하지 않는다.', () => {
    const invalidMoney = '1001';
    expect(validateMoney(invalidMoney)).toHaveErrorMessage(ERROR_MESSAGE.NOT_DIVIDED_BY_THOUSAND);
  });

  test('1000 단위의 값을 허용한다.', () => {
    const validMoney = '20000';
    expect(validateMoney(validMoney)).notToHaveError();
  });
});

describe('당첨 번호 입력에 대한 유효성 검사를 한다.', () => {
  test('빈 입력값을 허용하지 않는다.', () => {
    const invalidWinningNumber = ['', '', '', '', '', '', ''];
    expect(validateWinningNumber(invalidWinningNumber)).toHaveErrorMessage(
      ERROR_MESSAGE.EMPTY_WINNING_NUMBER
    );
  });

  test('숫자가 아닌 값을 허용하지 않는다.', () => {
    let invalidWinningNumber = ['1.2', '2', '3', '4', '5', '6', '7'];
    expect(validateWinningNumber(invalidWinningNumber)).toHaveErrorMessage(
      ERROR_MESSAGE.NOT_INTEGER_WINNING_NUMBER
    );

    invalidWinningNumber = ['e', '2', '3', '4', '5', '6', '7'];
    expect(validateWinningNumber(invalidWinningNumber)).toHaveErrorMessage(
      ERROR_MESSAGE.NOT_INTEGER_WINNING_NUMBER
    );

    invalidWinningNumber = ['1', '2', '3', '4', '5', '6', '3  3'];
    expect(validateWinningNumber(invalidWinningNumber)).toHaveErrorMessage(
      ERROR_MESSAGE.NOT_INTEGER_WINNING_NUMBER
    );
  });

  test('로또 숫자 범위(1 ~ 45) 외의 값을 허용하지 않는다.', () => {
    let invalidWinningNumber = ['0', '2', '3', '4', '5', '6', '7'];
    expect(validateWinningNumber(invalidWinningNumber)).toHaveErrorMessage(
      ERROR_MESSAGE.NOT_IN_VALID_WINNING_NUMBER_RANGE
    );

    invalidWinningNumber = ['1', '2', '3', '4', '55', '6', '7'];
    expect(validateWinningNumber(invalidWinningNumber)).toHaveErrorMessage(
      ERROR_MESSAGE.NOT_IN_VALID_WINNING_NUMBER_RANGE
    );

    invalidWinningNumber = ['-1', '2', '3', '4', '5', '6', '7'];
    expect(validateWinningNumber(invalidWinningNumber)).toHaveErrorMessage(
      ERROR_MESSAGE.NOT_IN_VALID_WINNING_NUMBER_RANGE
    );
  });

  test('중복된 값을 허용하지 않는다.', () => {
    const invalidWinningNumber = ['11', '11', '3', '4', '5', '6', '7'];
    expect(validateWinningNumber(invalidWinningNumber)).toHaveErrorMessage(
      ERROR_MESSAGE.DUPLICATE_WINNING_NUMBER
    );
  });

  test('로또 범위의 숫자(1 ~ 45)를 허용한다.', () => {
    const validWinningNumber = ['1', '4', '29', '39', '43', '45', '31'];
    expect(validateWinningNumber(validWinningNumber)).notToHaveError();
  });
});

expect.extend({
  toHaveErrorMessage(received, errorMessage) {
    const pass = received.errorMessage === errorMessage;

    if (!pass) {
      return {
        message: () =>
          `'${received.errorMessage}'라는 에러 메세지가 나와야 하는데 '${errorMessage}' <- 이게 나왔다.`,
        pass,
      };
    }
    return {
      message: () => `'${received.errorMessage}'라는 에러 메세지가 예상대로 잘 나왔다.`,
      pass,
    };
  },

  notToHaveError(received) {
    const pass = !received.hasError;

    if (!pass) {
      return {
        message: () => `validationResult에 에러가 없길 바랐지만 에러가 있었다.`,
        pass,
      };
    }
    return {
      message: () => `validationResult에 예상대로 에러가 없었다.`,
      pass,
    };
  },
});

describe('로또 게임을 진행한다.', () => {
  beforeEach(() => {
    window.store = new Store(initialState);
  });

  test('로또를 구입할 금액을 입력할 수 있다.', () => {
    const money = '5000';

    const moneyFormComponent = new MoneyForm();
    moneyFormComponent.updateMoney(money);

    expect(window.store.getState().money).toBe(money);
  });

  test('입력한 금액만큼의 로또를 자동 구매할 수 있다.', () => {
    const money = '5000';

    const moneyFormComponent = new MoneyForm();
    moneyFormComponent.updateMoney(money);

    expect(window.store.getState().lottoList.length).toBe(Number(money) / LOTTO.PRICE);
  });

  test('당첨 번호를 입력할 수 있다.', () => {
    const winningNumber = ['1', '4', '29', '39', '43', '45', '31'];
    const winningNumbers = ['1', '4', '29', '39', '43', '45'];

    const winningNumberFormComponent = new WinningNumberForm();
    winningNumberFormComponent.checkResult(winningNumber);

    expect(window.store.getState().winningNumbers).toStrictEqual(winningNumbers);
  });

  test('보너스 번호를 입력할 수 있다.', () => {
    const winningNumber = ['1', '4', '29', '39', '43', '45', '31'];
    const bonusNumber = '31';

    const winningNumberFormComponent = new WinningNumberForm();
    winningNumberFormComponent.checkResult(winningNumber);

    expect(window.store.getState().bonusNumber).toStrictEqual(bonusNumber);
  });

  test('로또 당첨 결과 모달을 확인할 수 있다.', () => {
    const winningNumber = ['1', '4', '29', '39', '43', '45', '31'];

    const winningNumberFormComponent = new WinningNumberForm();
    winningNumberFormComponent.checkResult(winningNumber);

    expect(window.store.getState().resultModalVisibility).toBe(true);
  });

  test('수익률을 계산할 수 있다.', () => {
    const originMoney = LOTTO.PRICE * 5;
    const currentMoney = PRIZE_MONEY.FIFTH;
    const expectEarningsRate = 0;

    const earningsRate = calculateEarningsRate(originMoney, currentMoney);

    expect(earningsRate).toBe(expectEarningsRate);
  });
});
