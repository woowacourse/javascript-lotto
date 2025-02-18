import getUniqueRandomNumbers from "../src/utils/getUniqueRandomNumbers.js";

describe("주어진 범위 안에서 중복되지 않는 숫자를 개수만큼 반환하는 메서드 테스트", () => {
  // given
  const min = 1;
  const max = 45;
  const count = 6;

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
