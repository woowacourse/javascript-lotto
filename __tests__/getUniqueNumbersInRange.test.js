import getUniqueRandomNumbers from "../src/utils/getUniqueRandomNumbers.js";
import {
  LOTTO_NUMBER_MAX,
  LOTTO_NUMBER_MIN,
  LOTTO_SIZE,
} from "../src/constants/validateConstants.js";

describe("주어진 범위 안에서 중복되지 않는 숫자를 개수만큼 반환하는 메서드 테스트", () => {
  test("중복되지 않는 숫자를 주어진 개수만큼 반환하는지 확인한다.", () => {
    // when
    const randomNumbers = getUniqueRandomNumbers(
      LOTTO_NUMBER_MIN,
      LOTTO_NUMBER_MAX,
      LOTTO_SIZE
    );
    const uniqueRandomNumbers = Array.from(new Set(randomNumbers));

    // then
    expect(randomNumbers).toHaveLength(6);
    expect(uniqueRandomNumbers).toHaveLength(6);
  });

  test("랜덤으로 반환된 숫자들이 주어진 범위 안에 존재하는지 확인한다.", () => {
    // when
    const randomNumbers = getUniqueRandomNumbers(
      LOTTO_NUMBER_MIN,
      LOTTO_NUMBER_MAX,
      LOTTO_SIZE
    );

    // then
    randomNumbers.forEach((number) => {
      expect(number).toBeLessThanOrEqual(45);
      expect(number).toBeGreaterThanOrEqual(1);
    });
  });
});
