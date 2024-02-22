/* eslint-disable max-lines-per-function */
import ERROR_MESSAGE from "../../src/constants/error.js";
import { LOTTO_LENGTH, LOTTO_RANGE } from "../../src/constants/option.js";
import WinningLotto from "../../src/domain/WinningLotto.js";

describe("WinningLotto 객체 테스트", () => {
  test("당첨 로또 번호는 중복되면 안된다.", () => {
    const DUPLICATE_WINNING_LOTTO_NUMBERS = [1, 1, 2, 3, 4, 5];

    expect(() => new WinningLotto(DUPLICATE_WINNING_LOTTO_NUMBERS)).toThrow(
      ERROR_MESSAGE.INVALID_LOTTO_NUMBER_DUPLICATE,
    );
  });

  test(`당첨 로또 번호는 ${LOTTO_RANGE.MIN} ~ ${LOTTO_RANGE.MAX} 사이의 숫자여야 한다.`, () => {
    const INVALID_WINNING_LOTTO_NUMBERS = [0, 1, 2, 3, 4, 46];

    expect(() => new WinningLotto(INVALID_WINNING_LOTTO_NUMBERS)).toThrow(
      ERROR_MESSAGE.INVALID_LOTTO_NUMBER_RANGE,
    );
  });

  test(`당첨 로또 번호는 ${LOTTO_LENGTH}개여야한다.`, () => {
    const INVALID_WINNING_LOTTO_LENGTH = [1, 2, 3, 4, 5];

    expect(() => new WinningLotto(INVALID_WINNING_LOTTO_LENGTH)).toThrow(
      ERROR_MESSAGE.INVALID_LOTTO_NUMBER_LENGTH,
    );
  });

  test("당첨 로또 번호는 숫자만 입력할 수 있다.", () => {
    const INVALID_LOTTO_NUMBERS = ["하나", 2, 3, 4, 5, 6];

    expect(() => new WinningLotto(INVALID_LOTTO_NUMBERS)).toThrow(
      ERROR_MESSAGE.INVALID_LOTTO_NUMBER_TYPE,
    );
  });

  test("당첨 로또 번호와 보너스 번호는 중복되면 안된다.", () => {
    const LOTTO_NUMBERS = [1, 2, 3, 4, 5, 6];
    const BONUS_NUMBER = 6;

    expect(() =>
      new WinningLotto(LOTTO_NUMBERS).setBonusNumber(BONUS_NUMBER),
    ).toThrow(ERROR_MESSAGE.INVALID_BONUS_NUMBER_DUPLICATE);
  });
});
