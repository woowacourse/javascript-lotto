import Lotto from '../src/domain/Lotto.js';

describe('Lotto 클래스 테스트', () => {
  const lotto = new Lotto([1, 2, 3, 4, 5, 6]);

  test('로또 생성 테스트', () => {
    expect(lotto.numbers).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
