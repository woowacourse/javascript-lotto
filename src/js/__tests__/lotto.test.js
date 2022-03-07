import Lotto from '../model/Lotto';
import { isNumbersDuplicated } from '../utils/random';

describe('소비자는 자동 구매를 할 수 있어야 한다.', () => {
  test('자동발급된 로또 한 장의 번호들 간에는 중복되어서는 안된다.', () => {
    const lotto1 = new Lotto();
    const lotto2 = new Lotto();

    expect(isNumbersDuplicated(lotto1.numbers)).toBe(false);
    expect(isNumbersDuplicated(lotto2.numbers)).toBe(false);
  });

  test('발급받은 로또 6개 숫자 모두가 1부터 45 범위 안에 있어야 한다.', () => {
    // given
    const lotto = new Lotto();

    // when
    const isCorrectRange = (numbers) => {
      const isBelowThreshold = (number) => number >= 1 && number <= 45;

      return numbers.every(isBelowThreshold);
    };

    // then
    expect(isCorrectRange(lotto.numbers)).toBe(true);
  });
});
