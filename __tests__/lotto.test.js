import Lotto from '../src/domain/Lotto';

describe('두 로또 번호에서 겹치는 숫자의 개수 확인', () => {
  const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
  test('당첨번호가 [7, 8, 9, 10, 11, 12]인 경우', () => {
    expect(lotto.countIntersect([7, 8, 9, 10, 11, 12])).toBe(0);
  });

  test('당첨번호가 [1, 2, 3, 4, 5, 6]인 경우', () => {
    expect(lotto.countIntersect([1, 2, 3, 4, 5, 6])).toBe(6);
  });
});
