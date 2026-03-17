import pickUniqueNumbersInRange from "../../src/utils/Random";

describe("랜덤 함수(pickUniqueNumbersInRange)를 테스트한다.", () => {
  test("count 만큼 숫자를 반환한다.", () => {
    const COUNT = 3;
    const result = pickUniqueNumbersInRange(1, 10, COUNT);
    expect(result.length).toBe(COUNT);
  });

  test("반환된 모든 숫자는 범위 안에 있다.", () => {
    const MIN_NUM = 1;
    const MAX_NUM = 10;
    const result = pickUniqueNumbersInRange(MIN_NUM, MAX_NUM, 3);

    result.forEach((number) => {
      expect(number >= 1 && number <= 10).toBe(true);
    });
  });

  test("중복 없이 반환한다.", () => {
    const result = pickUniqueNumbersInRange(1, 10, 3);

    const uniqueCount = new Set(result).size;
    expect(uniqueCount).toBe(result.length);
  });
});
