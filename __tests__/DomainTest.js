import Lotto from "../src/Domain/Lotto.js";

describe("로또 클래스 테스트", () => {
  test("로또 번호의 개수가 6개가 넘어가면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 6, 7]);
    }).toThrow("[ERROR]");
  });

  test("로또 번호에 중복된 숫자가 있으면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 5]);
    }).toThrow("[ERROR]");
  });

  describe("기능 동작", () => {
    test("정상적으로 로또가 생성된다.", () => {
      expect(new Lotto([1, 2, 3, 4, 5, 6])).toBeInstanceOf(Lotto);
    });

    test("toString()이 올바른 문자열을 반환한다.", () => {
      const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
      expect(lotto.toString()).toBe("[1, 2, 3, 4, 5, 6]");
    });

    test("당첨 번호와 일치하는 개수를 계산한다.", () => {
      const lotto = new Lotto([1, 2, 3, 10, 20, 30]);
      const winningNumbers = [1, 2, 4, 5, 6, 7];
      expect(lotto.countMatches(winningNumbers)).toBe(2);
    });

    test("보너스 번호가 포함되어 있으면 true를 반환한다.", () => {
      expect(new Lotto([1, 2, 3, 10, 20, 30]).hasBonus(20)).toBe(true);
    });

    test("보너스 번호가 포함되어 있지 않으면 false를 반환한다.", () => {
      expect(new Lotto([1, 2, 3, 10, 20, 30]).hasBonus(45)).toBe(false);
    });
  });
});
