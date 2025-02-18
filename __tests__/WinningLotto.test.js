import { BONUS_NUMBER_ERROR_MESSAGE } from "../src/constants/errorMessage.js";
import WinningLotto from "../src/domain/WinningLotto.js";

describe("당첨 번호에 대해 유효성 검사를 실시한다", () => {
  test("보너스 번호가 1에서 45사이 값이 아닐 경우, 에러를 발생시킨다", () => {
    // given
    const initialLottoNumber = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 50;

    // then
    expect(() => new WinningLotto(initialLottoNumber, bonusNumber)).toThrow(BONUS_NUMBER_ERROR_MESSAGE.RANGE);
  });
});
