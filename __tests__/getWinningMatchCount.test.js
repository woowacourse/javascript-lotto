import { getWinningMatchCount } from '../src/domain/getWinningMatchCount.js';
import Lotto from '../src/domain/Lotto.js';
import WinningLotto from '../src/domain/WinningLotto.js';

describe('로또 당첨 개수 테스트', () => {
  let winningNumbers, bonusNumber;

  beforeEach(() => {
    winningNumbers = [8, 12, 14, 23, 41, 38];
    bonusNumber = 45;
  });
  test('로또 당첨 개수가 5개여야 한다.', () => {
    const testLottos = [new Lotto([8, 12, 14, 23, 41, 1])];
    const winningLotto = new WinningLotto(winningNumbers, bonusNumber);
    const matchedCount = getWinningMatchCount(testLottos, winningLotto);

    expect(matchedCount).toEqual([0, 0, 0, 0, 0, 1, 0, 0]);
  });

  test('로또 당첨 개수가 5개이고 보너스 넘버가 있어야 한다.', () => {
    const testLottos = [new Lotto([8, 12, 14, 23, 41, 45])];
    const winningLotto = new WinningLotto(winningNumbers, bonusNumber);
    const matchedCount = getWinningMatchCount(testLottos, winningLotto);

    expect(matchedCount).toEqual([0, 0, 0, 0, 0, 0, 0, 1]);
  });

  test('로또 당첨 개수가 6개여야 한다.', () => {
    const testLottos = [new Lotto([8, 12, 14, 23, 41, 38])];
    const winningLotto = new WinningLotto(winningNumbers, bonusNumber);
    const matchedCount = getWinningMatchCount(testLottos, winningLotto);

    expect(matchedCount).toEqual([0, 0, 0, 0, 0, 0, 1, 0]);
  });
});
