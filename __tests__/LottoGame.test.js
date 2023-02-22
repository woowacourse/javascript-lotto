/* eslint-disable */

import LottoGame from '../src/js/domain/LottoGame.js';

describe('로또 번호 일치하는 개수 테스트', () => {
  test('로또 번호가 일치하는 개수만큼을 정확히 반환하여야 한다.', () => {
    const lotto = [3, 11, 14, 20, 33, 45];
    const winningLotto = [9, 11, 19, 20, 33, 44];

    const lottoGame = new LottoGame();
    const testResult = lottoGame.getMatchedLottoCount(lotto, winningLotto);

    expect(testResult).toBe(3);
  });
});

describe('로또 보너스 번호 포함 여부 테스트', () => {
  test('보너스 번호가 포함되어 있으면, true를 반환해야 한다.', () => {
    const lotto = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 3;

    const lottoGame = new LottoGame();
    const testResult = lottoGame.hasBonusNumber(lotto, bonusNumber);

    expect(testResult).toBe(true);
  });

  test('보너스 번호가 포함되어 있지 않으면, false를 반환해야 한다.', () => {
    const lotto = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 8;

    const lottoGame = new LottoGame();
    const testResult = lottoGame.hasBonusNumber(lotto, bonusNumber);

    expect(testResult).toBe(false);
  });
});

describe('당첨 결과에 대한 순위 반환 테스트', () => {
  test.each([
    [6, false, 1],
    [5, true, 2],
    [5, false, 3],
    [4, true, 4],
    [3, true, 5],
    [2, true, 0],
  ])('당첨 결과에 따른 올바른 순위를 반환한다.', (matchedCount, hasBonusNumber, rank) => {
    const lottoGame = new LottoGame();

    expect(lottoGame.getRank(matchedCount, hasBonusNumber)).toBe(rank);
  });
});
