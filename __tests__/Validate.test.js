import { MAX_LOTTO_NUMBER, MAX_PRICE, MIN_LOTTO_NUMBER, MIN_PRICE } from '../src/constants/common.js';
import Validate from '../src/Model/Validate.js';

describe('입력 값에 대한 테스트', () => {
  test('공백 입력에 대한 예외처리', () => {
    // given
    const input = '';

    // then
    expect(() => Validate.checkIsEmpty(input)).toThrow('[ERROR]');
  });

  test('숫자 이외의 입력 예외처리', () => {
    // given
    const input = '기린';

    // then
    expect(() => {
      Validate.checkIsNumber(input);
    }).toThrow('[ERROR]');
  });

  test.each([1001, 999])('천원 단위로 떨어지지 않는 경우 예외처리', (input) => {
    expect(() => {
      Validate.checkThousandUnit(input);
    }).toThrow('[ERROR]');
  });

  test.each([MAX_PRICE + 1, MIN_PRICE - 1])('구입 금액 범위(1000~100000) 예외처리', (input) => {
    expect(() => {
      Validate.checkPriceRange(input);
    }).toThrow('[ERROR]');
  });

  test.each([MIN_LOTTO_NUMBER - 1, MAX_LOTTO_NUMBER + 1])('1~45 범위 밖 입력 예외처리', (input) => {
    expect(() => {
      Validate.checkLottoNumberRange(input);
    }).toThrow('[ERROR]');
  });

  test('당첨 번호 중복 입력 예외처리', () => {
    expect(() => {
      const input = [1, 2, 3, 4, 5, 5];
      Validate.checkWinningNumberDuplicate(input);
    }).toThrow('[ERROR]');
  });
});
