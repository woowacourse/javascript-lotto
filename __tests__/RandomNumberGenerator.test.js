import { RandomNumberStaticValue } from '../src/constants/Constants.js';
import generateRandomNumbersInRange from '../src/utils/RandomNumberGenerator.js';

describe('Random Number Generator 테스트', () => {
  test('입력 갯수 만큼 중복되지 않는 랜덤 숫자 생성', () => {
    const RANDOM_NUMBER = generateRandomNumbersInRange(
      RandomNumberStaticValue.LOWER_INCLUSIVE,
      RandomNumberStaticValue.UPPER_INCLUSIVE,
      RandomNumberStaticValue.LENGTH,
    );

    expect(RANDOM_NUMBER.length === new Set(RANDOM_NUMBER).size).toBe(true);
  });
});
