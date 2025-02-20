import getUniqueRandomNumbers from "../src/utils/getUniqueRandomNumbers.js";
import {
  MIN_LOTTO_NUMBER,
  MAX_LOTTO_NUMBER,
  LOTTO_LENGTH,
} from "../src/constants/constants.js";

describe("주어진 범위 안에서 중복되지 않는 숫자를 개수만큼 반환하는 메서드 테스트", () => {
  // given
  const min = MIN_LOTTO_NUMBER;
  const max = MAX_LOTTO_NUMBER;
  const count = LOTTO_LENGTH;

  test("중복되지 않는 숫자를 주어진 개수만큼 반환하는지 확인한다.", () => {
    // when
    const randomNumbers = getUniqueRandomNumbers(min, max, count);
    const uniqueRandomNumbers = Array.from(new Set(randomNumbers));

    // then
    expect(randomNumbers).toHaveLength(count);
    expect(uniqueRandomNumbers).toHaveLength(count);
  });

  test("랜덤으로 반환된 숫자들이 주어진 범위 안에 존재하는지 확인한다.", () => {
    // when
    const randomNumbers = getUniqueRandomNumbers(min, max, count);

    // then
    randomNumbers.forEach((number) => {
      expect(number).toBeLessThanOrEqual(max);
      expect(number).toBeGreaterThanOrEqual(min);
    });
  });
});
