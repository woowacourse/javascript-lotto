import Lotto from "../src/model/Lotto.js";
import WinningLotto from "../src/model/WinningLotto.js";
import { RANK } from "../src/constant/index.js";
import { LOTTO_ERROR_MESSAGE } from "../src/constant/message.js";

describe("보너스 번호 테스트", () => {
  test("보너스 번호가 NaN인 경우 예외가 발생한다.", () => {
    expect(() => {
      new WinningLotto(new Lotto([1, 2, 3, 4, 5, 6]), NaN);
    }).toThrow(LOTTO_ERROR_MESSAGE.INPUT_RANGE);
  });

  test("보너스 번호가 1에서 45 사이의 숫자가 아닌 경우 예외가 발생한다.", () => {
    expect(() => {
      new WinningLotto(new Lotto([1, 2, 3, 4, 5, 6]), 56);
    }).toThrow(LOTTO_ERROR_MESSAGE.INPUT_RANGE);
  });

  test("당첨 번호 6개와 보너스 번호가 중복되는 경우 예외가 발생한다.", () => {
    expect(() => {
      new WinningLotto(new Lotto([1, 2, 3, 4, 5, 6]), 6);
    }).toThrow(LOTTO_ERROR_MESSAGE.INPUT_DUPLICATE);
  });

  test("보너스 번호가 정상 범위이고 당첨 번호와 중복되지 않는 경우 예외가 발생하지 않는다.", () => {
    expect(() => {
      new WinningLotto(new Lotto([1, 2, 3, 4, 5, 6]), 7);
    }).not.toThrow();
  });
});

describe("당첨 결과 계산", () => {
  test("보너스 번호가 정상 범위이고 당첨 번호와 중복되지 않는 경우 예외가 발생하지 않는다.", () => {
    const WinningLottonew = new WinningLotto(new Lotto([1, 2, 3, 4, 5, 6]), 7);
    const result = WinningLottonew.evaluateLottos([
      new Lotto([1, 2, 3, 4, 5, 6]),
      new Lotto([1, 2, 3, 4, 5, 7]),
      new Lotto([1, 2, 3, 4, 5, 8]),
      new Lotto([1, 2, 3, 4, 8, 9]),
      new Lotto([1, 2, 3, 8, 9, 10]),
    ]);
    expect(result.getCounts()).toEqual({
      [RANK.FIRST]: 1,
      [RANK.SECOND]: 1,
      [RANK.THIRD]: 1,
      [RANK.FOURTH]: 1,
      [RANK.FIFTH]: 1,
    });
  });
});
