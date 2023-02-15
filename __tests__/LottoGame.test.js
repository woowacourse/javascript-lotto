import LottoGame from '../src/domain/LottoGame.js';

test('로또 번호가 일치하는 개수만큼을 정확히 반환하여야 한다.', () => {
  const lotto = [3, 11, 14, 20, 33, 45];
  const winningLotto = [9, 11, 19, 20, 33, 44];

  const lottoGame = new LottoGame();
  const testResult = lottoGame.getMatchedLottoCount(lotto, winningLotto);

  expect(testResult).toBe(3);
});

describe('로또 번호에 보너스 번호가 포함되어 있는지 여부를 반환', () => {
  test('보너스 번호가 포함되어 있으면, true를 반환한다.', () => {
    const lotto = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 3;

    const lottoGame = new LottoGame();
    const testResult = lottoGame.checkBonusNumber(lotto, bonusNumber);

    expect(testResult).toBe(true);
  });

  test('보너스 번호가 포함되어 있지 않으면, false를 반환한다.', () => {
    const lotto = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 8;

    const lottoGame = new LottoGame();
    const testResult = lottoGame.checkBonusNumber(lotto, bonusNumber);

    expect(testResult).toBe(false);
  });

  test('일치하는 로또 숫자의 개수와 보너스 번호의 포함 여부를 반환하는 기능', () => {
    const lotto = [1, 2, 3, 4, 5, 6];
    const winningLotto = [3, 4, 5, 6, 7, 8];
    const bonusNumber = 3;

    const lottoGame = new LottoGame();
    const testResult = lottoGame.getLottoMatchedResult(lotto, winningLotto, bonusNumber);

    expect(testResult).toEqual({ matchedCount: 4, hasBonusNumber: true });
  });
});

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
