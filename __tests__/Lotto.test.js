import Lotto from "../src/Lotto";
import LottoNumber from "../src/LottoNumber";

describe("Lotto 클래스 유닛 테스트", () => {
  describe("getNumbers", () => {
    test("로또 객체의 숫자를 반환한다.", () => {
      // given
      const numbers = [1, 2, 3, 4, 5, 6];

      // when
      const lotto = new Lotto(numbers);

      // then
      expect(lotto.getNumbers()).toEqual([
        new LottoNumber(1),
        new LottoNumber(2),
        new LottoNumber(3),
        new LottoNumber(4),
        new LottoNumber(5),
        new LottoNumber(6),
      ]);
    });
  });

  describe("validateLotto", () => {
    test("당첨 번호는 1부터 45까지의 정수여야한다.", () => {
      // given
      const numbers = [1, 2, 3, 4, 5, 6];

      // when & then
      expect(() => new Lotto(numbers)).not.toThrow();
    });

    test("로또 번호가 정수가 아니면 에러를 반환한다.", () => {
      // given
      const numbers = [1, 2, 3, 4, 5, 6.1];

      // when & then
      expect(() => new Lotto(numbers)).toThrow();
    });

    test("당첨 번호가 1보다 작으면 에러를 반환한다.", () => {
      // given
      const numbers = [-1, 2, 3, 4, 5, 6];

      // when & then
      expect(() => new Lotto(numbers)).toThrow();
    });

    test("당첨 번호가 45보다 크면 에러를 반환한다.", () => {
      // given
      const numbers = [1, 2, 3, 4, 5, 46];

      // when & then
      expect(() => new Lotto(numbers)).toThrow();
    });

    test("당첨 번호가 중복되면 에러를 반환한다.", () => {
      // given
      const numbers = [1, 2, 3, 4, 5, 5];

      // when & then
      expect(() => new Lotto(numbers)).toThrow();
    });
    test("당첨 번호가 6개가 아니면 에러를 반환한다.", () => {
      // given
      const numbers = [1, 2, 3, 4, 5];

      // when & then
      expect(() => new Lotto(numbers)).toThrow();
    });
  });

  describe("includes", () => {
    test("전달받은 값이 로또 번호 안에 포함되면 true를 반환한다.", () => {
      // given
      const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
      const bonusNumber = new LottoNumber(1);

      // when
      const result = lotto.includes(bonusNumber);

      // then
      expect(result).toBe(true);
    });

    test("전달받은 값이 로또 번호 안에 포함되면 false를 반환한다.", () => {
      // given
      const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
      const bonusNumber = new LottoNumber(7);

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
      const winningNumbers = [
        new LottoNumber(1),
        new LottoNumber(2),
        new LottoNumber(3),
        new LottoNumber(7),
        new LottoNumber(8),
        new LottoNumber(9),
      ];

      // when
      const result = lotto.matchCount(winningNumbers);

      // then
      expect(result).toBe(3);
    });
  });
});
