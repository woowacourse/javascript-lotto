const { ERROR_MESSAGE } = require('../src/constant/message');
const {
  validatePurchaseAmount,
  validateLottoNumber,
  validateWinningNumber,
  validateBonusNumber,
  validateRestartCommand,
} = require('../src/domain/validator');

describe('구입 금액 유효성 검사 테스트', () => {
  test('구입 금액이 1,000원 미만인 경우 예외가 발생한다.', () => {
    //given
    const purchaseAmount = 500;

    //then
    expect(() => {
      validatePurchaseAmount(purchaseAmount);
    }).toThrow(ERROR_MESSAGE.LESS_THAN_MINIMUM);
  });

  test('구입 금액이 1,000원 단위가 아닌 경우 예외가 발생한다.', () => {
    //given
    const purchaseAmount = 1_032;

    //then
    expect(() => {
      validatePurchaseAmount(purchaseAmount);
    }).toThrow(ERROR_MESSAGE.HAS_CHANGE);
  });

  test.each([2_000, 40_000])(
    '구입 금액이 1,000원 이상, 1,000원 단위인 경우 정상적으로 동작한다.',
    (purchaseAmount) => {
      //then
      expect(() => {
        validatePurchaseAmount(purchaseAmount);
      }).not.toThrow();
    },
  );
});

describe('당첨 번호 유효성 검사 테스트', () => {
  test.each([
    [
      [0, 1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5, 46],
    ],
  ])('1~45 사이의 수가 포함된 경우 예외가 발생한다.', (winningNumber) => {
    // then
    expect(() => {
      winningNumber.forEach((lottoNumber) => {
        validateLottoNumber(lottoNumber);
      });
    }).toThrow(ERROR_MESSAGE.OUT_OF_RANGE);
  });

  test('숫자의 갯수가 6개가 아닌 경우 예외가 발생한다.', () => {
    //given
    const winningNumber = [1, 3, 10, 11];

    //then
    expect(() => {
      validateWinningNumber(winningNumber);
    }).toThrow(ERROR_MESSAGE.INVALID_WINNING_NUMBER_LENGTH);
  });

  test('중복된 숫자가 있는 경우 예외가 발생한다.', () => {
    //given
    const winningNumber = [1, 3, 10, 11, 11, 23];

    //then
    expect(() => {
      validateWinningNumber(winningNumber);
    }).toThrow(ERROR_MESSAGE.DUPLICATED_NUMBER);
  });

  test('중복되지 않는 1~45사이의 6개의 숫자인 경우 정상적으로 동작한다.', () => {
    //given
    const winningNumber = [1, 3, 10, 11, 22, 45];

    //then
    expect(() => {
      winningNumber.forEach((lottoNumber) => {
        validateLottoNumber(lottoNumber);
      });
      validateWinningNumber(winningNumber);
    }).not.toThrow();
  });
});

describe('보너스 번호 입력 유효성 검사 테스트', () => {
  const winningNumber = [1, 3, 4, 5, 10, 13];

  test.each([0, 46])('1~45 사이의 수가 아닌 경우 예외가 발생한다.', (bonusNumber) => {
    //then
    expect(() => {
      validateBonusNumber(bonusNumber, winningNumber);
    }).toThrow(ERROR_MESSAGE.OUT_OF_RANGE);
  });

  test('당첨 번호와 중복된 경우 예외가 발생한다', () => {
    //given
    const bonusNumber = 5;

    //then
    expect(() => {
      validateBonusNumber(bonusNumber, winningNumber);
    }).toThrow(ERROR_MESSAGE.DUPLICATED_NUMBER);
  });

  test('1~45사이의 당첨 번호와 중복되지 않은 숫자인 경우 정상적으로 동작한다.', () => {
    //given
    const bonusNumber = 14;

    //then
    expect(() => {
      validateBonusNumber(bonusNumber, winningNumber);
    }).not.toThrow();
  });
});

describe('재시작 커맨드 유효성 검사 테스트', () => {
  test.each(['k', '1', 'yn', '!!'])('커맨드가 y 혹은 n이 아닌 경우 예외가 발생한다.', (command) => {
    //then
    expect(() => {
      validateRestartCommand(command);
    }).toThrow(ERROR_MESSAGE.INVALID_RESTART_COMMAND);
  });

  test.each(['y', 'n'])('커맨드가 y 또는 n인 경우 정상적으로 동작한다.', (command) => {
    //then
    expect(() => {
      validateRestartCommand(command);
    }).not.toThrow();
  });
});
