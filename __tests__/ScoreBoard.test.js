/* eslint-disable */

import ScoreBoard from '../src/domain/ScoreBoard.js';

describe('로또 당첨 내역을 반환하는 기능 테스트', () => {
  test('로또 당첨 순위가 주어지면 올바른 당첨 내역을 반환한다.', () => {
    const scoreBoard = new ScoreBoard();
    const ranks = [1, 3, 4, 5, 5, 5, 3, 5, 0, 2];

    ranks.forEach((rank) => scoreBoard.writeBoard(rank));
    const testResult = scoreBoard.getBoard();

    expect(testResult).toEqual({ first: 1, second: 1, third: 2, fourth: 1, fifth: 4 });
  });

  test('로또 당첨 순위가 주어지면 올바른 수익률을 반환한다.', () => {
    const expectedPrice = 2_033_070_000;
    const LOTTO_PRICE = 1_000;
    const PERCENT = 100;

    const lottoCount = 10;
    const scoreBoard = new ScoreBoard(lottoCount);
    const ranks = [1, 3, 4, 5, 5, 5, 3, 5, 0, 2];

    const expectedRate = (expectedPrice / (lottoCount * LOTTO_PRICE)) * PERCENT;

    ranks.forEach((rank) => scoreBoard.writeBoard(rank));
    const rate = scoreBoard.getProfitRate();

    expect(rate).toBe(expectedRate);
  });
});
