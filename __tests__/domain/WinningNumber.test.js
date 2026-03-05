// 보너스 번호가 당첨번호랑 중복되면 안됨
// 보너스 번호가 잘 나오는 지..
import Lotto from "../../src/domain/Lotto.js";
import WinningNumber from "../../src/domain/WinningNumber.js";

describe("WinningNumbers 테스트", () => {
  const winningLotto = new Lotto([1, 2, 3, 4, 5, 6]);
  describe("생성자 테스트", () => {
    test("보너스 번호가 당첨 번호랑 중복되면 예외", () => {
      expect(() => new WinningNumber(winningLotto, 6)).toThrow("[ERROR]");
    });

    test("정상적인 값으로 생성된다", () => {
      expect(() => new WinningNumber(winningLotto, 7)).not.toThrow();
    });

    test("보너스 번호는 로또 숫자 범위 안이여야 한다.", () => {
      expect(() => new WinningNumber(winningLotto, 0)).toThrow("[ERROR]");
      expect(() => new WinningNumber(winningLotto, 46)).toThrow("[ERROR]");
    });
  });

  describe("구매한 로또와 비교해서 일치하는 개수랑 보너스 일치 여부를 반환한다.", () => {
    const winningNumber = new WinningNumber(winningLotto, 7);

    test.each([
      {
        numbers: [1, 2, 3, 4, 5, 6],
        expected: { matchCount: 6, hasBonus: false },
      },
      {
        numbers: [1, 2, 3, 4, 5, 7],
        expected: { matchCount: 5, hasBonus: true },
      },
      {
        numbers: [1, 2, 3, 4, 5, 8],
        expected: { matchCount: 5, hasBonus: false },
      },
      {
        numbers: [1, 2, 3, 4, 9, 10],
        expected: { matchCount: 4, hasBonus: false },
      },
      {
        numbers: [1, 2, 3, 9, 10, 11],
        expected: { matchCount: 3, hasBonus: false },
      },
      {
        numbers: [1, 2, 9, 10, 11, 12],
        expected: { matchCount: 2, hasBonus: false },
      },
      {
        numbers: [1, 9, 10, 11, 12, 13],
        expected: { matchCount: 1, hasBonus: false },
      },
      {
        numbers: [9, 10, 11, 12, 13, 14],
        expected: { matchCount: 0, hasBonus: false },
      },
    ])(
      "$numbers -> matchCount: $expected.matchCount, hasBonus: $expected.hasBonus",
      ({ numbers, expected }) => {
        const lotto = new Lotto(numbers);
        expect(winningNumber.getResult(lotto)).toEqual(expected);
      },
    );
  });
});
