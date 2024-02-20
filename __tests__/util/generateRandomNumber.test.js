import LOTTO_RULE from '../../src/constants/rules/lottoRule';
import generateRandomNumberInRange from '../../src/util/generateRandomNumberInRange';

describe('generateRandomNumberInRange 함수 테스트', () => {
  test('1부터 45범위의 숫자가 생성되는가', () => {
    const randomResult = generateRandomNumberInRange(LOTTO_RULE.RANDOM_NUMBER_FROM, LOTTO_RULE.RANDOM_NUMBER_TO);

    expect(randomResult).toBeGreaterThanOrEqual(1);
    expect(randomResult).toBeLessThanOrEqual(45);
  })
})