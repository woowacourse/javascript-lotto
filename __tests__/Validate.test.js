import {
  LOTTO_NUMBER_LENGTH,
  MAX_LOTTO_NUMBER,
  MAX_PRICE,
  MIN_LOTTO_NUMBER,
  MIN_PRICE,
} from '../src/constants/common.js';
import Validate from '../src/Model/Validate.js';

describe('입력 값에 대한 테스트', () => {
  test('공백 입력에 대한 예외처리', () => {
    const emptyString = '';
    expect(() => {
      Validate.checkIsEmpty(emptyString);
    }).toThrow('[ERROR]');
  });

  test('숫자 이외의 입력 예외처리', () => {
    const string = '기린';

    expect(() => {
      Validate.checkIsNumber(string);
    }).toThrow('[ERROR]');
  });

  test.each([MIN_PRICE + 1, MIN_PRICE - 1])('천원 단위로 떨어지지 않는 경우 예외처리', (price) => {
    expect(() => {
      Validate.checkThousandUnit(price);
    }).toThrow('[ERROR]');
  });

  test.each([MAX_PRICE + 1, MIN_PRICE - 1])('구입 금액 범위(1000~100000) 예외처리', (price) => {
    expect(() => {
      Validate.checkPriceRange(price);
    }).toThrow('[ERROR]');
  });

  test.each([MIN_LOTTO_NUMBER - 1, MAX_LOTTO_NUMBER + 1])('1 ~ 45 범위 밖 입력 예외처리', (lottoNumber) => {
    expect(() => {
      Validate.checkLottoNumberRange(lottoNumber);
    }).toThrow('[ERROR]');
  });

  test('당첨 번호 중복 입력 예외처리', () => {
    expect(() => {
      const duplicatedWinningNumbers = [1, 2, 3, 4, 5, 5];
      Validate.checkWinningNumberDuplicate(duplicatedWinningNumbers);
    }).toThrow('[ERROR]');
  });

  test('보너스 번호가 당첨 번호와 중복 입력 예외처리', () => {
    const bonusNumber = 6;
    const winningNumber = Array.from({ length: LOTTO_NUMBER_LENGTH }, (_, i) => i + 1);

    expect(() => {
      Validate.checkBonusNumberDuplicate(winningNumber, bonusNumber);
    }).toThrow('[ERROR]');
  });

  test('당첨 번호 6개가 아닌 입력 예외처리', () => {
    const winningNumber = Array.from({ length: LOTTO_NUMBER_LENGTH - 1 }, (_, i) => i + 1);

    expect(() => {
      Validate.checkWinningNumberCount(winningNumber);
    }).toThrow('[ERROR]');
  });
});
