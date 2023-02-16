import ScoreBoard from '../src/domain/ScoreBoard.js';

describe('로또 당첨 내역을 반환하는 기능 테스트', () => {
  test('로또 당첨 순위가 주어지면 올바른 당첨 내역을 반환한다.', () => {
    const scoreBoard = new ScoreBoard();
    const ranks = [1, 3, 4, 5, 5, 5, 3, 5, 0, 2];

    ranks.forEach((rank) => scoreBoard.writeBoard(rank));
    const testResult = scoreBoard.getBoard();

    expect(testResult).toEqual([0, 1, 1, 2, 1, 4]);
  });

  test('총 로또 당첨 금액을 반환하는 기능 테스트', () => {
    const lottoCount = 10;
    const scoreBoard = new ScoreBoard(lottoCount);
    const ranks = [1, 3, 4, 5, 5, 5, 3, 5, 0, 2];

    ranks.forEach((rank) => scoreBoard.writeBoard(rank));
    const rate = scoreBoard.getProfitRate();

    expect(rate).toBe((2_033_070_000 / (lottoCount * 1_000)) * 100);
  });
});
