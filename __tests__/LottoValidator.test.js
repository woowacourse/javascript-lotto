import Lotto from '../src/domain/validator/Lotto';
import Condition from '../src/constants/Condition';

const { LOTTO } = Condition;

describe('로또 기능 테스트', () => {
  test('로또 번호가 6개가 아니면 에러를 발생시킨다.', () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7];

    expect(() => {
      Lotto.validateNumbersLength(numbers, LOTTO.NUMBER_LENGTH);
    }).toThrow();
  });

  test('로또 번호가 중복되면 에러를 발생시킨다.', () => {
    const numbers = [1, 2, 3, 4, 5, 5];

    expect(() => {
      Lotto.validateNumbersDuplicate(numbers);
    }).toThrow();
  });

  test('로또 번호가 숫자가 아니면 에러를 발생시킨다.', () => {
    const numbers = ['ㄱ', 2, 3, 4, 5, 6];

    expect(() => {
      Lotto.validateNumbersType(numbers);
    }).toThrow();
  });

  test('로또 번호가 1에서 45 범위가 아닌 숫자가 포함됐을 때 에러를 발생시킨다.', () => {
    const numbers = [0, 1, 2, 3, 4, 5];

    expect(() => {
      Lotto.validateNumbersRange(numbers);
    }).toThrow();
  });
});
