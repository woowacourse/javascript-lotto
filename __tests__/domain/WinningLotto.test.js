/* eslint-disable max-lines-per-function */
import ERROR_MESSAGE from "../../src/constants/error.js";
import { LOTTO_LENGTH, LOTTO_RANGE } from "../../src/constants/option.js";
import Lotto from "../../src/domain/Lotto.js";
import WinningLotto from "../../src/domain/WinningLotto.js";

describe("WinningLotto 객체 테스트", () => {
  test("당첨 로또 번호 배열에 중복된 숫자가 있으면 오류를 던진다.", () => {
    const DUPLICATE_WINNING_LOTTO_NUMBERS = [1, 1, 2, 3, 4, 5];

    expect(() => new Lotto(DUPLICATE_WINNING_LOTTO_NUMBERS)).toThrow(
      ERROR_MESSAGE.INVALID_LOTTO_NUMBER_DUPLICATE,
    );
  });

  test(`당첨 로또 번호가 ${LOTTO_RANGE.MIN} ~ ${LOTTO_RANGE.MAX} 사이의 숫자가 아니면 오류를 던진다.`, () => {
    const INVALID_WINNING_LOTTO_NUMBERS = [0, 1, 2, 3, 4, 46];

    expect(() => new Lotto(INVALID_WINNING_LOTTO_NUMBERS)).toThrow(
      ERROR_MESSAGE.INVALID_LOTTO_NUMBER_RANGE,
    );
  });

  test(`입력한 당첨 로또 번호가 ${LOTTO_LENGTH}개가 아니면 오류를 던진다.`, () => {
    const INVALID_WINNING_LOTTO_LENGTH = [1, 2, 3, 4, 5];

    expect(() => new Lotto(INVALID_WINNING_LOTTO_LENGTH)).toThrow(
      ERROR_MESSAGE.INVALID_LOTTO_NUMBER_LENGTH,
    );
  });

  test("당첨 로또 번호에 숫자가 아닌 값을 입력하면 오류를 던진다.", () => {
    const INVALID_LOTTO_NUMBERS = ["하나", 2, 3, 4, 5, 6];

    expect(() => new Lotto(INVALID_LOTTO_NUMBERS)).toThrow(
      ERROR_MESSAGE.INVALID_LOTTO_NUMBER_TYPE,
    );
  });

  test("당첨 로또 번호와 보너스 번호가 중복이면 오류를 던진다.", () => {
    const LOTTO_NUMBERS = [1, 2, 3, 4, 5, 6];
    const BONUS_NUMBER = 6;

    expect(
      () => new WinningLotto(new Lotto(LOTTO_NUMBERS), BONUS_NUMBER),
    ).toThrow(ERROR_MESSAGE.INVALID_BONUS_NUMBER_DUPLICATE);
  });
});
