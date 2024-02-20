/* eslint-disable max-lines-per-function */
import WinningLotto from "../../src/domain/WinningLotto.js";

describe("WinningLotto 객체 테스트", () => {
  test("당첨 로또 번호는 중복되면 안된다.", () => {
    const DUPLICATE_WINNING_LOTTO_NUMBERS = [1, 1, 2, 3, 4, 5];

    expect(() => new WinningLotto(DUPLICATE_WINNING_LOTTO_NUMBERS)).toThrow(
      "[ERROR]",
    );
  });

  test("당첨 로또 번호는 1 ~ 45 사이의 숫자여야 한다.", () => {
    const INVALID_WINNING_LOTTO_NUMBERS = [0, 1, 2, 3, 4, 46];

    expect(() => new WinningLotto(INVALID_WINNING_LOTTO_NUMBERS)).toThrow(
      "[ERROR]",
    );
  });

  test("당첨 로또 번호는 6개여야한다.", () => {
    const INVALID_WINNING_LOTTO_LENGTH = [1, 2, 3, 4, 5];

    expect(() => new WinningLotto(INVALID_WINNING_LOTTO_LENGTH)).toThrow(
      "[ERROR]",
    );
  });

  test("당첨 로또 번호와 보너스 번호는 중복되면 안된다.", () => {
    const LOTTO_NUMBERS = [1, 2, 3, 4, 5, 6];
    const BONUS_NUMBER = 6;

    expect(() => new WinningLotto(LOTTO_NUMBERS, BONUS_NUMBER)).toThrow(
      "[ERROR]",
    );
  });
});
