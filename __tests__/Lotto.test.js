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
});
