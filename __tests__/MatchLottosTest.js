import { matchBonus, matchWinningCount } from "../src/domain/MatchLottos.js";

describe("로또 개수 매치 테스트", () => {
  test("6개 일치하는 경우", () => {
    const lotto = [1, 2, 3, 4, 5, 6];
    const winningLotto = [1, 2, 3, 4, 5, 6];

    const count = matchWinningCount(lotto, winningLotto);
    expect(count).toBe(6);
  });

  test("3개 일치하는 경우", () => {
    const lotto = [1, 2, 3, 14, 15, 16];
    const winningLotto = [1, 2, 3, 4, 5, 6];

    const count = matchWinningCount(lotto, winningLotto);
    expect(count).toBe(3);
  });

  test("아무것도 일치하지 않는 경우", () => {
    const lotto = [11, 12, 13, 14, 15, 16];
    const winningLotto = [1, 2, 3, 4, 5, 6];

    const count = matchWinningCount(lotto, winningLotto);
    expect(count).toBe(0);
  });

  test("5개 번호 + 보너스 번호가 일치하는 경우", () => {
    const lotto = [1, 2, 3, 4, 5, 7];
    const bonusNum = 7;
    const winningLotto = [1, 2, 3, 4, 5, 6];

    const count = matchWinningCount(lotto, winningLotto);
    const hasBonus = matchBonus(lotto, bonusNum);

    expect(count).toBe(5);
    expect(hasBonus).toBe(true);
  });
});
