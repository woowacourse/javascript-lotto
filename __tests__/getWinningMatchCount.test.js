import { getWinningMatchCount } from '../src/domain/getWinningMatchCount.js';

describe('로또 당첨 개수 테스트', () => {
  let winningNumbers, bonusNumber;

  beforeEach(() => {
    winningNumbers = [8, 12, 14, 23, 41, 38];
    bonusNumber = 45;
  });
  test('로또 당첨 개수가 5개여야 한다.', () => {
    const randomLottos = [[8, 12, 14, 23, 41, 1]];
    const matchedCount = getWinningMatchCount(randomLottos, { winningNumbers, bonusNumber });

    expect(matchedCount).toEqual([5]);
  });

  test('로또 당첨 개수가 5개이고 보너스 넘버가 있어야 한다.', () => {
    const randomLottos = [[8, 12, 14, 23, 41, 45]];
    const matchedCount = getWinningMatchCount(randomLottos, { winningNumbers, bonusNumber });

    expect(matchedCount).toEqual([5.5]);
  });

  test('로또 당첨 개수가 6개여야 한다.', () => {
    const randomLottos = [[8, 12, 14, 23, 41, 38]];
    const matchedCount = getWinningMatchCount(randomLottos, { winningNumbers, bonusNumber });

    expect(matchedCount).toEqual([6]);
  });
});
