import { ERROR_MESSAGE } from "../src/constants";
import Lotto from "../src/Model/Lotto";
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

  test("[기능] 구매한 로또 하나와 당첨로또를 비교해서 일치하는 번호의 개수를 반환해야한다", () => {
    // given
    const lotto = new Lotto([1, 2, 3, 4, 8, 9]);
    const winningLotto = new WinningLotto([1, 2, 3, 4, 5, 6], 7);

    // when
    const matchCount = winningLotto.getMatchCount(lotto);

    // then
    expect(matchCount).toEqual(4);
  });

  test("[기능] 구매한 로또 번호에 보너스 번호가 포함되어 있는지 확인해야 한다", () => {
    // given
    const lotto = new Lotto([1, 2, 3, 4, 8, 9]);
    const winningLotto = new WinningLotto([1, 2, 3, 4, 5, 6], 9);

    // when
    const hasBonus = winningLotto.hasBonus(lotto);

    // then
    expect(hasBonus).toEqual(true);
  });
});
