import Lotto from '../src/domain/Lotto';

describe('Lotto', () => {
  context('로또번호가 주어졌을 때', () => {
    context('중복된 숫자가 있는 경우', () => {
      it.each([
        { lottoNumbers: [1, 2, 3, 4, 5, 5] },
        { lottoNumbers: [1, 1, 2, 10, 18, 19] },
        { lottoNumbers: [1, 2, 7, 8, 9, 1] },
      ])('$lottoNumbers → 예외를 던져야 한다.', ({ lottoNumbers }) => {
        expect(() => new Lotto(lottoNumbers)).toThrowError();
      });
    });

    context('1에서 45 사이의 정수가 아닌 경우', () => {
      it.each([
        {
          lottoNumbers: [0, 1, 2, 3, 4, 5],
          lottoNumbers: [1, 2, 3, 4, 5, -6],
          lottoNumbers: [41, 42, 43, 44, 45, 46],
          lottoNumbers: [1, 2, 3, 4, 5, 'a'],
          lottoNumbers: [8, 9, 10, 42, 43, '1a'],
          lottoNumbers: [8, 9, 10, 42, 43, '1a'],
        },
      ])('$lottoNumbers → 예외를 던져야 한다.', ({ lottoNumbers }) => {
        expect(() => new Lotto(lottoNumbers)).toThrowError();
      });
    });

    it.each([
      { lottoNumbers: [1, 2, 3, 4, 5, 6], bonusNumber: 5, expected: true },
      { lottoNumbers: [1, 2, 3, 4, 5, 6], bonusNumber: 7, expected: false },
      { lottoNumbers: [10, 17, 18, 19, 20, 40], bonusNumber: 39, expected: false },
    ])(
      '$lottoNumbers에 보너스 번호 $bonusNumber가 있는지 여부는 $expected 가 되어야 한다.',
      ({ lottoNumbers, bonusNumber, expected }) => {
        // when
        const lotto = new Lotto(lottoNumbers);

        // then
        expect(lotto.hasBonusNumber(bonusNumber)).toBe(expected);
      },
    );
  });

  context('로또번호와 당첨번호가 주어졌을 때', () => {
    it.each([
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
      '당첨번호 $winningNumbers 에서 $lottoNumbers 로또의 당첨 갯수는 $matchNumbers 이어야 한다.',
      ({ lottoNumbers, winningNumbers, matchNumbers }) => {
        // when
        const lotto = new Lotto(lottoNumbers);

        // then
        expect(lotto.countMatchingNumbers(winningNumbers)).toBe(matchNumbers);
      },
    );
  });
});
