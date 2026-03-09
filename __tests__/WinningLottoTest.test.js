import { ERROR_MESSAGE } from "../src/constants";
import WinningLotto from "../src/Model/WinningLotto";

describe("당첨 로또 테스트", () => {
  test("[기능] 올바른 당첨 로또를 생성한다.", () => {
    // given
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    // when
    const winningLotto = new WinningLotto(winningNumbers, bonusNumber);

    // then
    expect(winningLotto).toBeInstanceOf(WinningLotto);
  });

  test("[예외] 당첨 번호에 0이 포함된 경우 에러를 발생시킨다", () => {
    // given
    const wrongWinningNumbers = [0, 1, 2, 3, 4, 5];
    const bonusNumber = 7;
    // when & then
    expect(() => new WinningLotto(wrongWinningNumbers, bonusNumber)).toThrow(
      ERROR_MESSAGE.PREFIX,
    );
  });

  test("[예외] 당첨 번호에 음의 정수가 포함된 경우 에러를 발생시킨다", () => {
    // given
    const wrongWinningNumbers = [-1, 1, 2, 3, 4, 5];
    const bonusNumber = 7;
    // when & then
    expect(() => new WinningLotto(wrongWinningNumbers, bonusNumber)).toThrow(
      ERROR_MESSAGE.PREFIX,
    );
  });

  test("[예외] 당첨 번호에 1~45 사이가 아닌 값이 포함된 경우 에러를 발생시킨다", () => {
    // given
    const wrongWinningNumbers = [1, 2, 3, 4, 5, 100];
    const bonusNumber = 7;
    // when & then
    expect(() => new WinningLotto(wrongWinningNumbers, bonusNumber)).toThrow(
      ERROR_MESSAGE.PREFIX,
    );
  });

  test("[예외] 당첨 번호가 중복되는 경우 에러를 발생시킨다", () => {
    // given
    const wrongWinningNumbers = [1, 1, 2, 3, 4, 5];
    const bonusNumber = 7;
    // when & then
    expect(() => new WinningLotto(wrongWinningNumbers, bonusNumber)).toThrow(
      ERROR_MESSAGE.PREFIX,
    );
  });

  test("[예외] 당첨 번호가 6개가 아닌 경우 에러를 발생시킨다", () => {
    // given
    const wrongWinningNumbers = [1, 2, 3, 4, 5];
    const bonusNumber = 7;
    // when & then
    expect(() => new WinningLotto(wrongWinningNumbers, bonusNumber)).toThrow(
      ERROR_MESSAGE.PREFIX,
    );
  });

  test("[예외] 보너스 번호가 당첨 번호와 중복되는 경우 에러를 발생시킨다", () => {
    // given
    const winningNUmbers = [1, 2, 3, 4, 5, 6];
    const wrongBonusNumber = 1;
    // when & then
    expect(() => new WinningLotto(winningNUmbers, wrongBonusNumber)).toThrow(
      ERROR_MESSAGE.PREFIX,
    );
  });
});
