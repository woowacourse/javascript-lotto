import Lotto from '../../src/domain/Lotto';
describe('로또 테스트', () => {
  test('하나의 로또가 6개의 중복되지 않은 숫자로 발행되는가', () => {
    const lotto = new Lotto();

    expect(new Set(lotto.lottoNumbers).size).toBe(6);
  });
});
