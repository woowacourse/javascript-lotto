import Lotto from "../src/Lotto";

describe("Lotto 클래스 유닛 테스트", () => {
  describe("getNumbers", () => {
    test("로또 객체의 숫자를 반환한다.", () => {
      // given
      const numbers = [1, 2, 3, 4, 5, 6];

      // when
      const lotto = new Lotto(numbers);

      // then
      expect(lotto.getNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });

  describe("includes", () => {
    test("전달받은 값이 로또 번호 안에 포함되면 true를 반환한다.", () => {
      // given
      const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
      const bonusNumber = 1;

      // when
      const result = lotto.includes(bonusNumber);

      // then
      expect(result).toBe(true);
    });

    test("전달받은 값이 로또 번호 안에 포함되면 false를 반환한다.", () => {
      // given
      const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
      const bonusNumber = 7;

      // when
      const result = lotto.includes(bonusNumber);

      // then
      expect(result).toBe(false);
    });
  });

  describe("matchCount", () => {
    test("로또 번호와 당첨 번호 사이에 일치하는 번호 개수를 반환한다.", () => {
      // given
      const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
      const winningNumbers = [1, 2, 3, 7, 8, 9];

      // when
      const result = lotto.matchCount(winningNumbers);

      // then
      expect(result).toBe(3);
    });
  });
});
