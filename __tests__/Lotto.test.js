import Lotto from '../src/domain/model/Lotto.js';
import { LOTTO_RULE } from '../src/domain/constants.js';
import { ERROR } from '../src/constants/message.js';

describe(`로또 항상 숫자 ${LOTTO_RULE.LENGTH}개를 가져야 한다.`, () => {
  test(`숫자 ${LOTTO_RULE.LENGTH}개를 가진 로또 1장을 발행한다.`, () => {
    // given
    const lottoNumbers = [1, 2, 3, 4, 5, 6];

    // when
    const lotto = new Lotto(lottoNumbers);

    // then
    expect(lotto.getNumbers()).toHaveLength(LOTTO_RULE.LENGTH);
  });

  test.each([
    [1, 2, 3, 4, 5, 6, 7],
    [1, 2, 3, 4, 5],
  ])(
    `숫자 ${LOTTO_RULE.LENGTH}개보다 적거나 많은 숫자를 가진 로또는 에러를 발생한다.`,
    (lottoNumbers) => {
      expect(() => {
        const lotto = new Lotto(lottoNumbers);
        lotto.getNumbers();
      }).toThrow(ERROR.LOTTO_NUMBER.QUANTITY);
    },
  );
});

describe(`로또 번호의 각 숫자 범위는 ${LOTTO_RULE.MIN_RANGE} ~ ${LOTTO_RULE.MAX_RANGE} 사이의 숫자여야한다.`, () => {
  test.each([[[1, 2, 3, 4, 5, 6]], [[40, 41, 42, 43, 44, 45]]])(
    `로또 번호의 각 숫자 범위는 ${LOTTO_RULE.MIN_RANGE} ~ ${LOTTO_RULE.MAX_RANGE}이다.`,
    (lottoNumbers) => {
      // when
      const lotto = new Lotto(lottoNumbers);

      // then
      expect(lotto.getNumbers()).toHaveLength(LOTTO_RULE.LENGTH);
    },
  );

  test.each([[[0, 2, 3, 4, 5, 6]], [[40, 41, 42, 43, 44, 46]]])(
    `로또 번호의 각 숫자 범위는 ${LOTTO_RULE.MIN_RANGE} ~ ${LOTTO_RULE.MAX_RANGE}가 아닐시 에러를 발생한다.`,
    (lottoNumbers) => {
      // when

      // then
      expect(() => {
        new Lotto(lottoNumbers);
      }).toThrow(ERROR.LOTTO_NUMBER.RANGE);
    },
  );
});

test('로또 번호는 오름차순이여야 한다.', () => {
  // given
  const lottoNumbers = [5, 35, 24, 1, 2, 9];
  // when
  const lotto = new Lotto(lottoNumbers);
  // then
  expect(lotto.getNumbers()).toEqual([1, 2, 5, 9, 24, 35]);
});

test.each([[[5, 35, 24, 1, 2, 2]], [[35, 35, 24, 1, 2, 3]]])(
  '로또 번호는 중복된 숫자가 포함되면 안된다.',
  (lottoNumbers) => {
    expect(() => {
      new Lotto(lottoNumbers);
    }).toThrow(ERROR.LOTTO_NUMBER.DUPLICATION);
  },
);
