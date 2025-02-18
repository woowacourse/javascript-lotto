import Lotto from "../src/Lotto";

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
});
