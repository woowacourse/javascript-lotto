const Lotto = require('../src/domain/model/Lotto');

describe('Lotto class 테스트', () => {
  test('로또 번호 6개를 반환한다.', () => {
    const lottoNumbers = [1, 2, 3, 4, 5, 6];
    const lotto = new Lotto(lottoNumbers);

    const result = lotto.getLottoNumbers();

    expect(result).toEqual(lottoNumbers);
  });
});
