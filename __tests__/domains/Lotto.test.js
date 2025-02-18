import Lotto from "../../src/domains/Lotto";

describe("로또 클래스 테스트", () => {
  describe("정상 케이스", () => {
    const numbers = [1, 2, 3, 4, 5, 45];

    test("로또 한 장의 번호는 6개이다.", () => {
      const lotto = new Lotto(numbers);
      expect(lotto.numbers).toHaveLength(6);
    });

    test("로또 번호의 범위는 1~45 사이이다.", () => {
      const lotto = new Lotto(numbers);

      lotto.numbers.forEach((number) => {
        expect(number).toBeGreaterThanOrEqual(1);
        expect(number).toBeLessThanOrEqual(45);
      });
    });
  });

  describe("예외 케이스", () => {
    test("로또 번호가 숫자가 아니면 에러가 발생한다.", () => {
      const numbers = [null, 1, 2, 3, 4, 5];
      expect(() => new Lotto(numbers)).toThrow("로또 번호는 숫자여야 합니다.");
    });

    test("로또 번호가 6개가 아니면 에러가 발생한다.", () => {
      const numbers = [1, 2, 3, 4, 5];
      expect(() => new Lotto(numbers)).toThrow("로또 번호는 6개여야 합니다.");
    });

    test("로또 번호의 범위가 1~45 사이가 아니면 에러가 발생한다.", () => {
      const numbers = [0, 2, 3, 4, 5, 46];
      expect(() => new Lotto(numbers)).toThrow(
        "로또 번호의 범위는 1~45 사이입니다."
      );
    });

    test("로또 번호가 중복되면 에러가 발생한다.", () => {
      const numbers = [1, 2, 3, 4, 5, 5];
      expect(() => new Lotto(numbers)).toThrow(
        "로또 번호는 중복되면 안됩니다."
      );
    });
  });
});
