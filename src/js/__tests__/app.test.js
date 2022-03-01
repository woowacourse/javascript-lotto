import { ERROR_MESSAGE } from '../constants';
import { validateMoney, validateWinningNumbers } from '../validation/validators';

describe('금액 입력에 대한 유효성 검사를 한다', () => {
  test('빈 입력값을 허용하지 않는다', () => {
    const invalidMoney = '';
    expect(validateMoney(invalidMoney)).toHaveErrorMessage(ERROR_MESSAGE.EMPTY_MONEY);
  });

  test('숫자가 아닌 값을 허용하지 않는다', () => {
    let invalidMoney = '1.2';
    expect(validateMoney(invalidMoney)).toHaveErrorMessage(ERROR_MESSAGE.NOT_INTEGER_MONEY);

    invalidMoney = '2ab2';
    expect(validateMoney(invalidMoney)).toHaveErrorMessage(ERROR_MESSAGE.NOT_INTEGER_MONEY);

    invalidMoney = '2   2';
    expect(validateMoney(invalidMoney)).toHaveErrorMessage(ERROR_MESSAGE.NOT_INTEGER_MONEY);
  });

  test('1000 미만의 값을 허용하지 않는다', () => {
    let invalidMoney = '999';
    expect(validateMoney(invalidMoney)).toHaveErrorMessage(ERROR_MESSAGE.UNDER_MIN_MONEY);

    invalidMoney = '0';
    expect(validateMoney(invalidMoney)).toHaveErrorMessage(ERROR_MESSAGE.UNDER_MIN_MONEY);

    invalidMoney = '-1';
    expect(validateMoney(invalidMoney)).toHaveErrorMessage(ERROR_MESSAGE.UNDER_MIN_MONEY);
  });

  test('1000 단위로 나누어 떨어지지 않는 값을 허용하지 않는다', () => {
    const invalidMoney = '1001';
    expect(validateMoney(invalidMoney)).toHaveErrorMessage(ERROR_MESSAGE.NOT_DIVIDED_BY_THOUSAND);
  });

  test('1000 단위의 값을 허용한다', () => {
    const validMoney = '20000';
    expect(validateMoney(validMoney)).notToHaveError();
  });
});

describe('당첨 번호 입력에 대한 유효성 검사를 한다', () => {
  test('빈 입력값을 허용하지 않는다', () => {
    const invalidWinningNumbers = ['', '', '', '', '', '', ''];
    expect(validateWinningNumbers(invalidWinningNumbers)).toHaveErrorMessage(
      ERROR_MESSAGE.EMPTY_WINNING_NUMBERS
    );
  });

  test('숫자가 아닌 값을 허용하지 않는다', () => {
    let invalidWinningNumbers = ['1.2', '2', '3', '4', '5', '6', '7'];
    expect(validateWinningNumbers(invalidWinningNumbers)).toHaveErrorMessage(
      ERROR_MESSAGE.NOT_INTEGER_WINNING_NUMBER
    );

    invalidWinningNumbers = ['e', '2', '3', '4', '5', '6', '7'];
    expect(validateWinningNumbers(invalidWinningNumbers)).toHaveErrorMessage(
      ERROR_MESSAGE.NOT_INTEGER_WINNING_NUMBER
    );

    invalidWinningNumbers = ['1', '2', '3', '4', '5', '6', '3  3'];
    expect(validateWinningNumbers(invalidWinningNumbers)).toHaveErrorMessage(
      ERROR_MESSAGE.NOT_INTEGER_WINNING_NUMBER
    );
  });

  test('로또 숫자 범위(1 ~ 45) 외의 값을 허용하지 않는다', () => {
    let invalidWinningNumbers = ['0', '2', '3', '4', '5', '6', '7'];
    expect(validateWinningNumbers(invalidWinningNumbers)).toHaveErrorMessage(
      ERROR_MESSAGE.NOT_IN_VALID_WINNING_NUMBER_RANGE
    );

    invalidWinningNumbers = ['1', '2', '3', '4', '55', '6', '7'];
    expect(validateWinningNumbers(invalidWinningNumbers)).toHaveErrorMessage(
      ERROR_MESSAGE.NOT_IN_VALID_WINNING_NUMBER_RANGE
    );

    invalidWinningNumbers = ['-1', '2', '3', '4', '5', '6', '7'];
    expect(validateWinningNumbers(invalidWinningNumbers)).toHaveErrorMessage(
      ERROR_MESSAGE.NOT_IN_VALID_WINNING_NUMBER_RANGE
    );
  });

  test('중복된 값을 허용하지 않는다', () => {
    const invalidWinningNumbers = ['11', '11', '3', '4', '5', '6', '7'];
    expect(validateWinningNumbers(invalidWinningNumbers)).toHaveErrorMessage(
      ERROR_MESSAGE.DUPLICATE_WINNING_NUMBERS
    );
  });

  test('로또 범위의 숫자(1 ~ 45)를 허용한다', () => {
    const validWinningNumbers = ['1', '4', '29', '39', '43', '45', '31'];
    expect(validateWinningNumbers(validWinningNumbers)).notToHaveError();
  });
});

expect.extend({
  toHaveErrorMessage(received, errorMessage) {
    const pass = received.errorMessage === errorMessage;

    if (!pass) {
      return {
        message: () =>
          `'${received.errorMessage}'라는 에러 메세지가 나와야 하는데 '${errorMessage}' <- 이게 나왔다`,
        pass,
      };
    }
    return {
      message: () => `'${received.errorMessage}'라는 에러 메세지가 예상대로 잘 나왔다`,
      pass,
    };
  },

  notToHaveError(received) {
    const pass = !received.hasError;

    if (!pass) {
      return {
        message: () => `validationResult에 에러가 없길 바랐지만 에러가 있었다`,
        pass,
      };
    }
    return {
      message: () => `validationResult에 예상대로 에러가 없었다`,
      pass,
    };
  },
});
