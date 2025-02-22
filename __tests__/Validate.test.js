import {
  LOTTO_NUMBER_LENGTH,
  MAX_LOTTO_NUMBER,
  MAX_PRICE,
  MIN_LOTTO_NUMBER,
  MIN_PRICE,
} from '../src/constants/common.js';
import Validate from '../src/Model/Validate.js';
import { getLottoNumberArray } from '../src/util/createNumber.js';

describe('입력 값에 대한 테스트', () => {
  test('공백 입력 시 에러가 발생한다.', () => {
    const emptyString = '';
    expect(() => {
      Validate.checkIsEmpty(emptyString);
    }).toThrow('[ERROR]');
  });

  test('숫자 이외의 입력 시 에러가 발생한다.', () => {
    const string = '기린';

    expect(() => {
      Validate.checkIsNumber(string);
    }).toThrow('[ERROR]');
  });

  test.each([MIN_PRICE + 1, MIN_PRICE - 1])('구입 금액이 천원 단위로 떨어지지 않는 경우 에러가 발생한다.', (price) => {
    expect(() => {
      Validate.checkThousandUnit(price);
    }).toThrow('[ERROR]');
  });

  test.each([MAX_PRICE + 1, MIN_PRICE - 1])('구입 금액 범위(1000~100000) 밖 입력 시 에러가 발생한다.', (price) => {
    expect(() => {
      Validate.checkPriceRange(price);
    }).toThrow('[ERROR]');
  });

  test.each([MIN_LOTTO_NUMBER - 1, MAX_LOTTO_NUMBER + 1])(
    '로또 숫자 입력 시 1 ~ 45 범위 밖 입력되면 에러가 발생된다.',
    (lottoNumber) => {
      expect(() => {
        Validate.checkLottoNumberRange(lottoNumber);
      }).toThrow('[ERROR]');
    },
  );

  test('로또 당첨 번호 입력 시 중복된 번호가 있는 경우 에러가 발생한다.', () => {
    expect(() => {
      const duplicatedWinningNumbers = [1, 2, 3, 4, 5, 5];
      Validate.checkWinningNumberDuplicate(duplicatedWinningNumbers);
    }).toThrow('[ERROR]');
  });

  test('보너스 번호가 당첨 번호와 중복 입력된 경우 에러가 발생한다.', () => {
    const bonusNumber = 6;
    const winningNumber = getLottoNumberArray();

    expect(() => {
      Validate.checkBonusNumberDuplicate(winningNumber, bonusNumber);
    }).toThrow('[ERROR]');
  });

  test('6개의 당첨 번호가 입력되지 않은 경우 에러가 발생한다.', () => {
    const winningNumber = Array.from({ length: LOTTO_NUMBER_LENGTH - 1 }, (_, i) => i + 1);

    expect(() => {
      Validate.checkWinningNumberCount(winningNumber);
    }).toThrow('[ERROR]');
  });
});
