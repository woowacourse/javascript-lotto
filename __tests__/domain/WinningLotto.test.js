import Lotto from '../../src/domain/Lotto.js';
import WinningLotto from '../../src/domain/WinningLotto.js';

describe('WinningLotto 단위테스트', () => {
  describe('로또 당첨 여부 판단 테스트', () => {
    let winningNumbers;
    let bonusNumber;
    let winningLotto;

    beforeAll(() => {
      winningNumbers = [1, 2, 3, 4, 5, 6];
      bonusNumber = 7;
      winningLotto = new WinningLotto(winningNumbers, bonusNumber);
    });

    test.each([[[1, 2, 3, 4, 5, 6], 1]])(
      '6개의 번호가 일치하면 1등을 반환한다.',
      (lottoNumbers, rank) => {
        const lotto = new Lotto(lottoNumbers);
        expect(winningLotto.determineRank(lotto)).toBe(rank);
      }
    );

    test.each([[[1, 2, 3, 4, 5, 7], 2]])(
      '5개의 번호 + 보너스 번호가 일치하면 2등을 반환한다.',
      (lottoNumbers, rank) => {
        const lotto = new Lotto(lottoNumbers);
        expect(winningLotto.determineRank(lotto)).toBe(rank);
      }
    );

    test.each([[[1, 2, 3, 4, 5, 45], 3]])(
      '5개의 번호가 일치하고 보너스 번호가 다르면 3등을 반환한다.',
      (lottoNumbers, rank) => {
        const lotto = new Lotto(lottoNumbers);
        expect(winningLotto.determineRank(lotto)).toBe(rank);
      }
    );

    test.each([
      [[1, 2, 3, 4, 44, 45], 4],
      [[1, 2, 3, 4, 44, 45], 4]
    ])('4개의 번호가 일치하면 4등을 반환한다.', (lottoNumbers, rank) => {
      const lotto = new Lotto(lottoNumbers);
      expect(winningLotto.determineRank(lotto)).toBe(rank);
    });

    test.each([
      [[1, 2, 3, 43, 44, 45], 5],
      [[1, 2, 3, 43, 44, 45], 5]
    ])('3개의 번호가 일치하면 5등을 반환한다.', (lottoNumbers, rank) => {
      const lotto = new Lotto(lottoNumbers);
      expect(winningLotto.determineRank(lotto)).toBe(rank);
    });

    test.each([
      [[1, 2, 42, 43, 44, 45], 6],
      [[1, 2, 42, 43, 44, 45], 6],
      [[1, 41, 42, 43, 44, 45], 6],
      [[1, 41, 42, 43, 44, 45], 6],
      [[40, 41, 42, 43, 44, 45], 6],
      [[40, 41, 42, 43, 44, 45], 6]
    ])('3개 미만의 번호가 일치하면 다음기회에^^.', (lottoNumbers, rank) => {
      const lotto = new Lotto(lottoNumbers);
      expect(winningLotto.determineRank(lotto)).toBe(rank);
    });
  });
});
