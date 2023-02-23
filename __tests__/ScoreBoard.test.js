/* eslint-disable */

import ScoreBoard from '../src/js/domain/ScoreBoard.js';

describe('로또 당첨 내역 반환 테스트', () => {
  test.each([
    [[1, 3, 4, 5, 5, 5, 3, 5, 0, 2], { first: 1, second: 1, third: 2, fourth: 1, fifth: 4 }],
    [
      [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 0, 0, 0],
      { first: 3, second: 3, third: 3, fourth: 3, fifth: 3 },
    ],
    [[0], { first: 0, second: 0, third: 0, fourth: 0, fifth: 0 }],
  ])(`로또 당첨 순위가 주어졌을 때, 올바른 당첨 내역을 반환해야 한다.`, (ranks, expectedBoard) => {
    const scoreBoard = new ScoreBoard(ranks.length);
    ranks.forEach((rank) => scoreBoard.writeBoard(rank));
    const resultBoard = scoreBoard.getBoard();

    expect(resultBoard).toEqual(expectedBoard);
  });
});

describe('순위 반환 테스트', () => {
  test.each([
    [[1, 3, 4, 5, 5, 5, 3, 5, 0, 2], 20_330_700],
    [[1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 0, 0, 0], 33_859_250],
    [[5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 45.45454545454545],
    ,
    [[0], 0],
  ])('로또 당첨 순위가 주어지면 올바른 수익률을 반환해야 한다.', (ranks, expectedProfitRate) => {
    const scoreBoard = new ScoreBoard(ranks.length);
    ranks.forEach((rank) => scoreBoard.writeBoard(rank));
    const resultRate = scoreBoard.getProfitRate();
    console.log(resultRate);

    expect(resultRate).toBe(expectedProfitRate);
  });
});
