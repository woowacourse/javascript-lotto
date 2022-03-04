import { matchNumber } from '../utils/util';

describe('로또 당첨 확인 테스트', () => {
  it('로또 번호를 몇 개 맞췄는 지 확인할 수 있다.', () => {
    const purchasedLotto = [1, 2, 3, 4, 5, 6];
    const winningLotto = [1, 2, 3, 7, 8, 9];
    expect(matchNumber(purchasedLotto, winningLotto)).toBe(3);
  });
});
