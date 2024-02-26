import Lotto from '../../src/domain/Lotto.js';

describe('Lotto 단위테스트', () => {
  test('생성자에 전달된 숫자들이 오름차순으로 정렬되어 저장된다.', () => {
    const numbers = [5, 3, 1, 4, 2];
    const lotto = new Lotto(numbers);

    expect(lotto.getNumbers()).toEqual([1, 2, 3, 4, 5]);
  });

  test('getNumbers 메서드는 저장된 숫자들을 반환한다.', () => {
    const numbers = [1, 2, 3, 4, 5];
    const lotto = new Lotto(numbers);

    expect(lotto.getNumbers()).toEqual(numbers);
  });
});
