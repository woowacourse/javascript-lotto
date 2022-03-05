import { ERROR_MESSAGE } from '../constants';
import { validateMoney, validateWinningNumbers } from '../validation/validators';
import StatisticsModal from '../components/StatisticsModal';
import { sum } from '../utils';

expect.extend({
  toHaveErrorMessage(received, errorMessage) {
    const pass = received.errorMessage === errorMessage;
    if (!pass) {
      return {
        message: () =>
          `'${received.errorMessage}'라는 에러메세지가 나와야 하는데 '${errorMessage}' <- 이게 나왔다`,
        pass,
      };
    }
    return {
      message: () => `'${received.errorMessage}'라는 에러메세지가 예상대로 잘 나왔다`,
      pass,
    };
  },

  notToHaveError(received) {
    const pass = !received.hasError;
    if (!pass) {
      return {
        message: () => `validationResult에 에러가 없길 바랬는데, 에러가 있었다`,
        pass,
      };
    }
    return {
      message: () => `validationResult에 예상대로 에러가 없었다`,
      pass,
    };
  },

  toHaveWinningLottoCount({ winningNums, lottoList, rank }, expectedCount) {
    const statisticsModal = new StatisticsModal();
    const winningCounts = statisticsModal.getWinningCounts(winningNums, lottoList);
    const pass = winningCounts[rank] === expectedCount && sum(winningCounts) === expectedCount;
    if (!pass) {
      return {
        message: () => `${rank}등 복권의 개수가 ${expectedCount}개 이길 기대했는데, 아니었다`,
        pass,
      }
    }
    return {
      message: () => `${rank}등 복권의 개수가 예상대로 ${expectedCount}개였다`,
      pass,
    }
  }
});

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
    let invalidMoney = '1001';
    expect(validateMoney(invalidMoney)).toHaveErrorMessage(ERROR_MESSAGE.NOT_DIVIDED_BY_THOUSAND);
  });

  test('1000 단위의 값을 허용한다', () => {
    let validMoney = '20000';
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

  test('로또 숫자 범위 외의 값을 허용하지 않는다', () => {
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
    let invalidWinningNumbers = ['11', '11', '3', '4', '5', '6', '7'];
    expect(validateWinningNumbers(invalidWinningNumbers)).toHaveErrorMessage(
      ERROR_MESSAGE.DUPLICATE_WINNING_NUMBERS
    );
  });

  test('로또 범위의 숫자를 허용한다', () => {
    let validWinningNumbers = ['1', '4', '29', '39', '43', '45', '31'];
    expect(validateWinningNumbers(validWinningNumbers)).notToHaveError();
  });
});

describe('당첨 번호 입력에 대한 유효성 검사를 한다', () => {
  const winningNums = {
    normal: [1, 2, 3, 4, 5, 6],
    bonus: 7
  };

  test('당첨번호 6개중 맞춘 숫자가 3개인 경우 5등인지 검사한다', () => {
    const lottoList = [
      [1, 2, 3, 44, 55, 66], // 5등
      [1, 2, 33, 4, 55, 66], // 5등
      [1, 2, 3, 44, 55, 7], // 5등
    ];
    expect({ winningNums, lottoList, rank: 5 }).toHaveWinningLottoCount(3);
  });

  test('당첨번호 6개중 맞춘 숫자가 4개인 경우 4등인지 검사한다', () => {
    const lottoList = [
      [1, 2, 3, 4, 55, 66], // 4등
      [1, 2, 33, 4, 5, 66], // 4등
      [1, 2, 3, 4, 55, 7], // 4등
    ];
    expect({ winningNums, lottoList, rank: 4 }).toHaveWinningLottoCount(3);
  });

  test('당첨번호 6개중 맞춘 숫자가 5개이고 보너스 번호는 다른 경우 3등인지 검사한다', () => {
    const lottoList = [
      [1, 2, 3, 4, 5, 66], // 3등
      [1, 2, 33, 4, 5, 6], // 3등
      [1, 2, 3, 4, 5, 77], // 3등
    ];
    expect({ winningNums, lottoList, rank: 3 }).toHaveWinningLottoCount(3);
  });

  test('당첨번호 6개중 맞춘 숫자가 5개이고 보너스 번호도 맞춘 경우 2등인지 검사한다', () => {
    const lottoList = [
      [1, 2, 3, 4, 5, 7], // 2등
    ];
    expect({ winningNums, lottoList, rank: 2 }).toHaveWinningLottoCount(1);
  });

  test('당첨번호 6개중 맞춘 숫자가 6개인 경우 1등인지 검사한다', () => {
    const lottoList = [
      [1, 2, 3, 4, 5, 6], // 1등
    ];
    expect({ winningNums, lottoList, rank: 1 }).toHaveWinningLottoCount(1);
  });
});
