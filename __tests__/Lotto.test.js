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

describe('[Lotto] 당첨 번호 매칭 테스트', () => {
  test('각 로또는 주어진 당첨 번호 목록과 일치하는 번호 개수를 반환할 수 있다.', () => {
    // given
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const winningNumbers = [4, 5, 6, 7, 8, 9];

    // when
    const matchedNumbersCount = lotto.countMatchedNumbers(winningNumbers);

    // then
    expect(matchedNumbersCount).toBe(3);
  });
});

describe('[Lotto] 보너스 번호 매칭 테스트', () => {
  test('각 로또는 주어진 보너스 번호의 포함 여부를 반환할 수 있다.', () => {
    // given
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const bonusNumber = 6;

    // when
    const hasBonusNumber = lotto.hasNumber(bonusNumber);

    // then
    expect(hasBonusNumber).toBe(true);
  });
});
