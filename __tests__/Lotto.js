import Lotto from '../src/domain/Lotto.js';

describe('Lotto', () => {
  test('로또는 6개의 숫자로 이뤄진 배열이다.', () => {
    const lottoNumbers = [1, 2, 3, 4, 5, 6];
    const lotto = new Lotto(lottoNumbers);

    expect(lotto.numbers).toEqual(lottoNumbers);
  });
});
