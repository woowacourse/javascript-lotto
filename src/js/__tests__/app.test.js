import { ERROR_MESSAGE } from '../constants';
import { checkDuplicateOfWinningNumberList, checkInvalidRangeOfWinningNumberList, checkNotDevidedByThousandMoney, checkOverMaxMoney, validateMoney } from '../validation/validators';
import StatisticsModal from '../components/StatisticsModal';
import { sum } from '../utils';

expect.extend({
  toHaveErrorMessage(received, errorMessage) {
    const pass = received.errorMessage === errorMessage;
    if (!pass) {
      return {
        message: () => {
          if (!received.errorMessage) {
            return `에러메세지가 안나와야 나와야 하는데 '${errorMessage}' <- 이런 에러 메세지가 나왔다`;
          }
          return `'${received.errorMessage}'라는 에러메세지가 나와야 하는데 '${errorMessage}' <- 이게 나왔다`;
        },
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
  test('1000 단위로 나누어 떨어지지 않는 값을 허용하지 않는다', () => {
    const invalidMoney = '1001';
    expect(checkNotDevidedByThousandMoney(invalidMoney)).toHaveErrorMessage(ERROR_MESSAGE.NOT_DIVIDED_BY_THOUSAND);
  });

  test('1000 단위로 나누어 떨어지는 금액을 허용한다', () => {
    const validMoney = '12000';
    expect(checkNotDevidedByThousandMoney(validMoney)).notToHaveError();
  });

  test('십만원을 초과하는 금액을 허용하지 않는다', () => {
    const invalidMoney = '101000';
    expect(checkOverMaxMoney(invalidMoney)).toHaveErrorMessage(ERROR_MESSAGE.OVER_MAX_MONEY);
  });

  test('십만원이하의 금액을 허용한다', () => {
    const validMoney = '100000';
    expect(checkOverMaxMoney(validMoney)).notToHaveError();
  });
});

describe('당첨 번호 입력에 대한 유효성 검사를 한다', () => {
  test('로또 숫자 범위(1 ~ 45) 외의 값을 허용하지 않는다', () => {
    let invalidWinningNumberList = ['0', '2', '3', '4', '5', '6', '7'];
    expect(checkInvalidRangeOfWinningNumberList(invalidWinningNumberList)).toHaveErrorMessage(ERROR_MESSAGE.INVALID_WINNING_NUMBER_RANGE);

    invalidWinningNumberList = ['1', '2', '3', '4', '55', '6', '7'];
    expect(checkInvalidRangeOfWinningNumberList(invalidWinningNumberList)).toHaveErrorMessage(ERROR_MESSAGE.INVALID_WINNING_NUMBER_RANGE);

    invalidWinningNumberList = ['-1', '2', '3', '4', '5', '6', '7'];
    expect(checkInvalidRangeOfWinningNumberList(invalidWinningNumberList)).toHaveErrorMessage(ERROR_MESSAGE.INVALID_WINNING_NUMBER_RANGE);
  });

  test('중복된 값을 허용하지 않는다', () => {
    let invalidWinningNumberList = ['11', '11', '3', '4', '5', '6', '7'];
    expect(checkDuplicateOfWinningNumberList(invalidWinningNumberList)).toHaveErrorMessage(ERROR_MESSAGE.DUPLICATE_WINNING_NUMBERS);
  });

  test('중복되지 않는 로또 범위의 숫자를 허용한다', () => {
    let validWinningNumbers = ['1', '4', '29', '39', '43', '45', '31'];
    expect(checkInvalidRangeOfWinningNumberList(validWinningNumbers)).notToHaveError();
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
