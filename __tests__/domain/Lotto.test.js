import Lotto from "../../src/domain/Lotto.js";

describe("Lotto 테스트", () => {
  describe("생성자 테스트", () => {
    test(`로또의 번호가 ${Lotto.SIZE}개가 아니면 예외`, () => {
      expect(() => new Lotto([1, 2, 3, 4, 5, 6, 7])).toThrow("[ERROR]");
      expect(() => new Lotto([1, 2, 3, 4, 5])).toThrow("[ERROR]");
    });

    test("로또 번호가 허용 범위 내에 있는지 테스트 (최소 미만)", () => {
      expect(() => new Lotto([0, 1, 2, 3, 4, 5])).toThrow("[ERROR]");
    });

    test("로또 번호가 허용 범위 내에 있는지 테스트 (최대 초과)", () => {
      expect(() => new Lotto([1, 2, 3, 4, 5, 46])).toThrow("[ERROR]");
    });

    test("로또번호가 중복이 되고 있는지 테스트", () => {
      expect(() => new Lotto([1, 1, 2, 3, 4, 5])).toThrow("[ERROR]");
    });

    test("번호를 오름차순으로 반환한다", () => {
      const lotto = new Lotto([6, 5, 4, 3, 2, 1]);
      expect(lotto.getNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });

  describe("hasNumber 테스트", () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);

    test("포함된 번호는 true를 반환한다", () => {
      expect(lotto.hasNumber(1)).toBe(true);
    });

    test("포함되지 않은 번호는 false를 반환한다", () => {
      expect(lotto.hasNumber(45)).toBe(false);
    });
  });
});
