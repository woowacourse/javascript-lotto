import { ERROR_MESSAGE } from '../src/constant/message';
import {
  number,
  purchaseAmount,
  winningNumber as _winningNumber,
  bonusNumber as _bonusNumber,
  restartCommand,
} from '../src/js/domain/Validate';

describe('숫자 입력 유효성 검사 테스트', () => {
  test('빈 값인 경우 예외가 발생한다.', () => {
    //given
    const input = '';

    //then
    expect(() => {
      number(input);
    }).toThrow(ERROR_MESSAGE.NULL);
  });

  test.each([' ', '1 3', '13 '])('공백이 포함되어 있는 경우 예외가 발생한다.', (input) => {
    //then
    expect(() => {
      number(input);
    }).toThrow(ERROR_MESSAGE.HAS_BLANK);
  });

  test.each(['bbbb', 'a', '^^4', '10a'])('숫자가 아닌 경우 예외가 발생한다.', (input) => {
    //then
    expect(() => {
      number(input);
    }).toThrow(ERROR_MESSAGE.NOT_A_NUMBER);
  });
});

describe('구입 금액 입력 유효성 검사 테스트', () => {
  test('구입 금액이 1,000원 미만인 경우 예외가 발생한다.', () => {
    //given
    const money = '500';

    //then
    expect(() => {
      purchaseAmount(money);
    }).toThrow(ERROR_MESSAGE.LESS_THAN_MINIMUM);
  });

  test('구입 금액이 1,000으로 나누어지지 않으면 예외가 발생한다.', () => {
    //given
    const money = '1032';

    //then
    expect(() => {
      purchaseAmount(money);
    }).toThrow(ERROR_MESSAGE.HAS_CHANGE);
  });
});

describe('당첨 번호 입력 유효성 검사 테스트', () => {
  test('1~45 사이의 수가 아닌 경우 예외가 발생한다.', () => {
    //given
    const numbers = '1,3,4,5,46,10';
    //then
    expect(() => {
      _winningNumber(numbers);
    }).toThrow(ERROR_MESSAGE.OUT_OF_RANGE);
  });

  test('숫자의 갯수가 6개가 아닌 경우 예외가 발생한다.', () => {
    //given
    const numbers = '1,3,4,5,10';

    //then
    expect(() => {
      _winningNumber(numbers);
    }).toThrow(ERROR_MESSAGE.INVALID_WINNING_NUMBER_LENGTH);
  });

  test('중복된 숫자가 있는 경우 예외가 발생한다.000으로', () => {
    //given
    const numbers = '1,3,4,5,10,10';

    //then
    expect(() => {
      _winningNumber(numbers);
    }).toThrow(ERROR_MESSAGE.DUPLICATED_NUMBER);
  });
});

describe('보너스 번호 입력 유효성 검사 테스트', () => {
  test('1~45 사이의 수가 아닌 경우 예외가 발생한다.', () => {
    //given
    const winningNumber = [1, 3, 4, 5, 10, 13];
    const bonusNumber = '55';

    //then
    expect(() => {
      _bonusNumber(bonusNumber, winningNumber);
    }).toThrow(ERROR_MESSAGE.OUT_OF_RANGE);
  });

  test('당첨 번호와 중복된 경우 예외가 발생한다', () => {
    //given
    const winningNumber = [1, 3, 4, 5, 10, 13];
    const bonusNumber = '5';

    //then
    expect(() => {
      _bonusNumber(bonusNumber, winningNumber);
    }).toThrow(ERROR_MESSAGE.DUPLICATED_NUMBER);
  });
});

describe('재시작 커맨드 입력 유효성 검사 테스트', () => {
  test.each(['k', '1', 'yn', '!!'])('y 혹은 n이 아닌 경우 예외가 발생한다', (command) => {
    //then
    expect(() => {
      restartCommand(command);
    }).toThrow(ERROR_MESSAGE.INVALID_RESTART_COMMAND);
  });
});
