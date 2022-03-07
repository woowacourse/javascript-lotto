import { createRandomNumbers } from '../utils/index.js';
import { LOTTO_RULES } from '../constant/index.js';

describe(`중복되지 않는 ${LOTTO_RULES.MIN_RANGE} ~ ${LOTTO_RULES.MAX_RANGE} 사이의 숫자를 ${LOTTO_RULES.BALL_COUNT}개 생성한다.`, () => {
  test(`${LOTTO_RULES.MIN_RANGE}이상의 숫자만 있어야 한다.`, () => {
    createRandomNumbers(
      LOTTO_RULES.MIN_RANGE,
      LOTTO_RULES.MAX_RANGE,
      LOTTO_RULES.BALL_COUNT,
    ).forEach((number) => {
      expect(number).toBeGreaterThanOrEqual(LOTTO_RULES.MIN_RANGE);
    });
  });

  test(`${LOTTO_RULES.MAX_RANGE}이하의 숫자만 있어야 한다.`, () => {
    createRandomNumbers(
      LOTTO_RULES.MIN_RANGE,
      LOTTO_RULES.MAX_RANGE,
      LOTTO_RULES.BALL_COUNT,
    ).forEach((number) => {
      expect(number).toBeLessThanOrEqual(LOTTO_RULES.MAX_RANGE);
    });
  });

  test('중복된 숫자가 있으면 안된다', () => {
    expect(
      createRandomNumbers(LOTTO_RULES.MIN_RANGE, LOTTO_RULES.MAX_RANGE, LOTTO_RULES.BALL_COUNT)
        .length,
    ).toBe(LOTTO_RULES.BALL_COUNT);

    expect(
      new Set(
        createRandomNumbers(LOTTO_RULES.MIN_RANGE, LOTTO_RULES.MAX_RANGE, LOTTO_RULES.BALL_COUNT),
      ).size,
    ).toBe(LOTTO_RULES.BALL_COUNT);
  });
});
