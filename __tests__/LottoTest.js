import Lotto from "../src/domain/Lotto.js";
import { LOTTO_INTO } from "../src/constants.js";
import { generateRandomNumbers } from "../src/generateRandomNumbers.js";

describe("랜덤 숫자 배열 반환 테스트", () => {
  test("반환된 결과물의 요소는 6개", () => {
    expect(generateRandomNumbers()).toHaveLength(LOTTO_INTO.LOTTO_NUMBER_COUNT);
  });
  test("반환된 결과물의 요소는 중복되지 않음", () => {
    expect(new Set(generateRandomNumbers()).size).toBe(
      LOTTO_INTO.LOTTO_NUMBER_COUNT
    );
  });
  test("1~45 사이의 숫자만 반환한다", () => {
    const numbers = generateRandomNumbers();
    numbers.forEach((n) => {
      expect(n).toBeGreaterThanOrEqual(LOTTO_INTO.LOTTO_MIN_NUMBER);
      expect(n).toBeLessThanOrEqual(LOTTO_INTO.LOTTO_MAX_NUMBER);
    });
  });
});

describe("Lotto 생성 테스트", () => {
  test("유효한 번호로 생성 -> 통과", () => {
    expect(() => new Lotto([1, 2, 3, 4, 5, 6])).not.toThrow();
  });

  test("6개 미만 -> 에러", () => {
    expect(() => new Lotto([1, 2, 3, 4, 5])).toThrow("[ERROR]");
  });

  test("6개 초과 -> 에러", () => {
    expect(() => new Lotto([1, 2, 3, 4, 5, 6, 7])).toThrow("[ERROR]");
  });

  test("중복 번호 -> 에러", () => {
    expect(() => new Lotto([1, 2, 3, 4, 5, 5])).toThrow("[ERROR]");
  });

  test("1 미만 번호 -> 에러", () => {
    expect(() => new Lotto([0, 2, 3, 4, 5, 6])).toThrow("[ERROR]");
  });

  test("45 초과 번호 -> 에러", () => {
    expect(() => new Lotto([1, 2, 3, 4, 5, 46])).toThrow("[ERROR]");
  });

  test("오름차순 정렬 -> 정렬된 배열 반환", () => {
    const lotto = new Lotto([6, 5, 4, 3, 2, 1]);
    expect(lotto.getNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
