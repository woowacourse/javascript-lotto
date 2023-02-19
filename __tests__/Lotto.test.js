import Lotto from '../src/domain/Lotto';

describe('로또 클래스 테스트', () => {
  test.each([
    {
      lottoNumbers: [1, 2, 3, 4, 5, 6],
      winningNumbers: [1, 2, 3, 4, 5, 6],
      matchNumbers: 6,
    },
    {
      lottoNumbers: [10, 11, 40, 41, 42, 43],
      winningNumbers: [1, 2, 3, 4, 10, 11],
      matchNumbers: 2,
    },
    {
      lottoNumbers: [1, 2, 3, 4, 5, 6],
      winningNumbers: [40, 41, 42, 43, 44, 45],
      matchNumbers: 0,
    },
  ])(
    '로또번호와 당첨번호를 비교하여 당첨 개수를 계산할 수 있다.',
    ({ lottoNumbers, winningNumbers, matchNumbers }) => {
      // when
      const lotto = new Lotto(lottoNumbers);

      // then
      expect(lotto.countMatchingNumbers(winningNumbers)).toBe(matchNumbers);
    },
  );

  test.each([
    {
      lottoNumbers: [1, 2, 3, 4, 5, 6],
      bonusNumber: 5,
      hasBonusNumber: true,
    },
  ])(
    '로또번호에 보너스 번호가 있는지 확인할 수 있어야 한다.',
    ({ lottoNumbers, bonusNumber, hasBonusNumber }) => {
      // when
      const lotto = new Lotto(lottoNumbers);

      // then
      expect(lotto.hasBonusNumber(bonusNumber)).toBe(hasBonusNumber);
    },
  );
});

describe('로또 클래스 예외 테스트', () => {
  test.each([[[1, 2, 3, 4, 5, 5]]])('로또 번호 6자리는 중복되지 않아야 한다.', (lottoNumbers) => {
    expect(() => new Lotto(lottoNumbers)).toThrowError();
  });

  test.each([[[1, 2, 3, 4, 5, 'a']], [[8, 9, 10, 42, 43, '1a']], [[1.1, 10, 11, 12, 13, 14]]])(
    '로또 번호 6자리는 모두 정수로 이루어져야 한다.',
    (lottoNumbers) => {
      expect(() => new Lotto(lottoNumbers)).toThrowError();
    },
  );

  test.each([[[0, 1, 2, 3, 4, 5]], [[1, 2, 3, 4, 5, -6]], [[41, 42, 43, 44, 45, 46]]])(
    '로또 번호는 1에서 45 사이의 숫자가 아닌 경우 예외를 던져야 한다. %#',
    (lottoNumbers) => {
      expect(() => new Lotto(lottoNumbers)).toThrowError();
    },
  );
});
