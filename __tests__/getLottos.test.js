import { getLottos } from '../src/domain/getLottos';

describe('로또 발행 테스트', () => {
  test.each([
    [1000, 1],
    [99999, 99],
  ])('구입 금액이 %원이면, 로또 발행 개수는 %p여야 한다.', (quantity, expectedCount) => {
    expect(() => getLottos(quantity).length.toBe(expectedCount));
  });

  test('발행된 로또들는 6개의 숫자를 가져야 한다.', () => {
    const lottos = getLottos(3);
    lottos.forEach((lotto) => {
      expect(lotto.getNumbers().length).toBe(6);
    });
  });

  test('발행된 로또들는 중복없이 6개의 숫자를 가져야 한다.', () => {
    const lottos = getLottos(3);
    lottos.forEach((lotto) => {
      const setLotto = new Set(lotto.getNumbers());
      expect(setLotto.size).toBe(6);
    });
  });

  test('발행된 로또들의 6개의 숫자는 1이상 45이하의 숫자여야 한다.', () => {
    const lottos = getLottos(3);
    lottos.forEach((lotto) => {
      lotto.getNumbers().forEach((value) => {
        expect(value).toBeGreaterThanOrEqual(1);
        expect(value).toBeLessThanOrEqual(45);
      });
    });
  });
});
