import Lotto from '../src/domain/Lotto';

describe('[Lotto] 로또 번호 유효성 테스트', () => {
  test('하나의 로또는 6개의 원소를 가진다.', () => {
    // given
    const randomNumbers = [1, 9, 11, 24, 32, 45];
    const lotto = new Lotto(randomNumbers);

    // when
    const lottoNumbers = lotto.getNumbers();

    // then
    expect(lottoNumbers).toHaveLength(6);
  });

  test('로또 안의 각 원소는 1~45 사이의 숫자여야 한다.', () => {
    // given
    const randomNumbers = [1, 9, 11, 24, 32, 45];
    const lotto = new Lotto(randomNumbers);

    // when
    const lottoNumbers = lotto.getNumbers();

    // then
    lottoNumbers.forEach((number) => {
      expect(number).toBeGreaterThanOrEqual(1);
      expect(number).toBeLessThanOrEqual(45);
    });
  });

  test('로또 안의 각 원소는 서로 중복되지 않아야 한다.', () => {
    // given
    const randomNumbers = [1, 9, 11, 11, 32, 45];
    const lotto = new Lotto(randomNumbers);

    // when
    const lottoNumbers = lotto.getNumbers();

    // then
    expect(new Set(lottoNumbers).size).not.toBe(6);
  });
});
