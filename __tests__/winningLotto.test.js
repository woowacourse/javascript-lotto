import Lotto from "../src/step1/model/Lotto.js";
import WinningLotto from "../src/step1/model/WinningLotto.js";
import { RANK } from "../src/step1/constant/index.js";
import { LOTTO_ERROR_MESSAGE } from "../src/step1/constant/message.js";

describe("보너스 번호 테스트", () => {
  test("당첨 번호 6개와 중복되는 경우 예외가 발생한다.", () => {
    expect(() => {
      new WinningLotto(new Lotto([1, 2, 3, 4, 5, 6]), 6);
    }).toThrow(LOTTO_ERROR_MESSAGE.INPUT_DUPLICATE);
  });

  test("당첨 번호가 1에서 45 사이의 숫자가 아닌 경우 예외가 발생한다.", () => {
    expect(() => {
      new WinningLotto(new Lotto([1, 2, 3, 4, 5, 46]), 6);
    }).toThrow(LOTTO_ERROR_MESSAGE.INPUT_RANGE);
  });

  test("당첨 번호가 NaN인 경우 예외가 발생한다.", () => {
    expect(() => {
      new WinningLotto(new Lotto([1, 2, 3, 4, 5, NaN]), 6);
    }).toThrow(LOTTO_ERROR_MESSAGE.INPUT_RANGE);
  });

  test("보너스 번호가 1에서 45 사이의 숫자가 아닌 경우 예외가 발생한다.", () => {
    expect(() => {
      new WinningLotto(new Lotto([1, 2, 3, 4, 5, 6]), 56);
    }).toThrow(LOTTO_ERROR_MESSAGE.INPUT_RANGE);
  });

  test("보너스 번호가 NaN인 경우 예외가 발생한다.", () => {
    expect(() => {
      new WinningLotto(new Lotto([1, 2, 3, 4, 5, 6]), 46);
    }).toThrow(LOTTO_ERROR_MESSAGE.INPUT_RANGE);
  });
});

describe("당첨 결과 계산", () => {
  test.each([
    ["6개", RANK.FIRST, [1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6], 7],
    [
      "5개와 보너스 번호",
      RANK.SECOND,
      [1, 2, 3, 4, 5, 8],
      [1, 2, 3, 4, 5, 7],
      8,
    ],
    ["5개", RANK.THIRD, [1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 7], 8],
    ["4개", RANK.FOURTH, [1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 7, 8], 9],
    ["3개", RANK.FIFTH, [1, 2, 3, 4, 5, 6], [1, 2, 3, 7, 8, 9], 10],
  ])(
    "%s가 일치되는 경우 '%s'를 반환한다",
    (_, rank, lottoNumbers, winningLottoNumbers, bonusNumber) => {
      const winningLotto = new WinningLotto(
        new Lotto(winningLottoNumbers),
        bonusNumber,
      );
      const result = winningLotto.evaluateLotto(new Lotto(lottoNumbers));
      expect(result).toBe(rank);
    },
  );
});
