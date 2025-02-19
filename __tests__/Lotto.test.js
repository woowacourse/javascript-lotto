import Lotto from '../src/Model/Lotto.js';

describe('로또 ', () => {
  test('6자리 숫자로 로또를 만든다', () => {
    // given
    const numbers = [1, 2, 3, 4, 5, 6];

    // when
    const lotto = new Lotto(numbers);

    // then
    expect(lotto).toBeDefined();
  });

  test('로또 번호 숫자 오름차순 정렬 테스트', () => {
    const numbers = [6, 5, 4, 3, 2, 1];
    const lotto = new Lotto(numbers);

    expect(lotto.numbers).toEqual(numbers.sort((a, b) => a - b));
  });
});
