import WinningLotto from '../src/model/WinningLotto';

describe('LottoMahcine 테스트', () => {
  const winningNumber = '1,2,3,4,5,6';
  const winningLotto = new WinningLotto(winningNumber);

  test('단일 로또 번호들과 당첨 번호가 몇 개 일치하는지 구하기', () => {
    const matchCount = winningLotto.computeMatchCounts(winningLotto.winningNumber, [1, 2, 3, 4, 5, 6]);

    expect(matchCount).toBe(6);
  });

  test('일치 갯수에 따라 등수가 몇등인지 구하기', () => {
    const rank = winningLotto.checkLotteryWinningsRank([1, 2, 3, 4, 5, 6]);

    expect(rank).toBe(1);
  });
});
