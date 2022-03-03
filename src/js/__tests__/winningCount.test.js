import { setResultModal } from '../core/setResultModal.js';

describe('당첨 갯수와 수익률이 알맞게 구해지는지 테스트', () => {
  test('당첨 갯수가 알맞게 구해지는지 확인한다', () => {
    const myLotto = [[1, 2, 3, 4, 5, 6]];
    const winningLotto = [1, 2, 3, 4, 5, 6, 7];

    expect(setResultModal(myLotto, winningLotto)[0].sameSix).toBe(1);
  });

  test('수익률이 알맞게 구해지는지 확인한다', () => {
    const myLotto = [[11, 22, 33, 44, 55, 42]];
    const winningLotto = [1, 2, 3, 4, 5, 6, 7];

    expect(setResultModal(myLotto, winningLotto)[1]).toBe(0);
  });
});
