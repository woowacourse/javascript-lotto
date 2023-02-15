import Lotto from '../src/domain/Lotto';

const lotto = new Lotto([1, 2, 3, 4, 5, 6]);

describe('두 로또 번호에서 겹치는 숫자의 개수 확인', () => {
  test('당첨번호가 [7, 8, 9, 10, 11, 12]인 경우', () => {
    expect(lotto.countIntersect([7, 8, 9, 10, 11, 12])).toBe(0);
  });

  test('당첨번호가 [1, 2, 3, 4, 5, 6]인 경우', () => {
    expect(lotto.countIntersect([1, 2, 3, 4, 5, 6])).toBe(6);
  });
});

describe('로또에 특정 번호가 들어있는지 확인', () => {
  test('6이 있는 경우', () => {
    expect(lotto.includes(6)).toBeTruthy();
  });

  test('7이 없는 경우', () => {
    expect(lotto.includes(7)).toBeFalsy();
  });
});
