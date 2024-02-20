import Lotto from '../src/Lotto';

describe('로또 테스트', () => {
  test('오름차순으로 정렬된 로또 번호를 갖는다.', () => {
    const lotto = new Lotto([3, 4, 5, 10, 2, 1]);

    const RESULT_LOTTO = [1, 2, 3, 4, 5, 10];

    expect(lotto.numberList).toEqual(RESULT_LOTTO);
  });
});
