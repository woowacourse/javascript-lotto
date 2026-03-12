import Lotto from "../../../src/domain/Lotto.js";
import WinningNumber from "../../../src/domain/WinningNumber.js";

describe("WinningNumber 생성 성공테스트", () => {
  test("로또 번호는 중복 될 수 없다", () => {
    const numbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    const winningNumber = new WinningNumber(numbers, bonusNumber);
    expect(winningNumber).toBeInstanceOf(WinningNumber);
  });
});

describe("WinningNumber 생성 실패 테스트(유효성검사)", () => {
  const numbers = [1, 2, 3, 4, 5, 6];
  test("보너스 넘버는 중복될 수 없다", () => {
    const bonusNumber = 1;
    expect(() => new WinningNumber(numbers, bonusNumber)).toThrow(
      WinningNumber.ERROR.DUPLICATE,
    );
  });

  test("보너스 넘버는 1~45 까지여야 한다", () => {
    expect(() => new WinningNumber(numbers, 0)).toThrow(
      WinningNumber.ERROR.INVALID_RANGE,
    );
    expect(() => new WinningNumber(numbers, 46)).toThrow(
      WinningNumber.ERROR.INVALID_RANGE,
    );
  });
});

describe("WinningNumber method test", () => {
  const winningNumber = new WinningNumber([1, 2, 3, 4, 5, 6], 7);

  test("로또와 비교해서 일치하는 숫자와 보너스숫자의 여부를 반환", () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    expect(winningNumber.getMatchCount(lotto)).toEqual({
      matchWinning: 6,
      matchBonus: false,
    });
  });

  test("로또와 비교해서 일치하는 숫자와 보너스숫자의 여부를 반환", () => {
    const lotto = new Lotto([1, 2, 3, 7, 38, 39]);
    expect(winningNumber.getMatchCount(lotto)).toEqual({
      matchWinning: 3,
      matchBonus: true,
    });
  });
});
