import Lotto from '../src/domain/Lotto';
import WinningLotto from '../src/domain/WinningLotto';

describe('WinningLotto', () => {
  context.each([
    {
      lottoNumbers: [1, 2, 3, 4, 5, 6],
      winningNumbers: [1, 2, 3, 4, 5, 6],
      bonusNumber: 7,
      matchingNumbers: 6,
      hasBonusNumber: false,
    },
    {
      lottoNumbers: [10, 11, 40, 41, 42, 43],
      winningNumbers: [1, 2, 3, 4, 10, 11],
      bonusNumber: 18,
      matchingNumbers: 2,
      hasBonusNumber: false,
    },
    {
      lottoNumbers: [1, 2, 3, 4, 5, 6],
      winningNumbers: [1, 2, 4, 5, 6, 12],
      bonusNumber: 7,
      matchingNumbers: 5,
      hasBonusNumber: false,
    },
    {
      lottoNumbers: [1, 2, 3, 4, 5, 6],
      winningNumbers: [40, 41, 42, 43, 44, 45],
      bonusNumber: 7,
      matchingNumbers: 0,
      hasBonusNumber: false,
    },
  ])(
    '로또 $lottoNumbers 와 당첨로또 $winningNumbers (보너스 번호: $bonusNumber) 가 주어졌을 때',
    ({ lottoNumbers, winningNumbers, bonusNumber, matchingNumbers, hasBonusNumber }) => {
      const lotto = new Lotto(lottoNumbers);
      const winningLotto = new WinningLotto(winningNumbers, bonusNumber);

      it(`맞힌 갯수가 ${matchingNumbers} 이어야 한다.`, () => {
        expect(winningLotto.countMatchingNumbers(lotto)).toBe(matchingNumbers);
      });

      it(`보너스 번호를 맞췄는지 여부는 ${hasBonusNumber} 가 되어야 한다.`, () => {
        expect(winningLotto.hasBonusNumber(lotto)).toBe(hasBonusNumber);
      });
    },
  );
});
