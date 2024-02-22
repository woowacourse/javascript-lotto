/* eslint-disable max-lines-per-function */
import { VARIABLE_ALIAS, ERROR_MESSAGE } from '../src/constant/Messages.js';
import OPTIONS from '../src/constant/Options.js';
import Lotto from '../src/domain/Lotto.js';

describe('Lotto 단위테스트', () => {
  describe('로또 발행 테스트', () => {
    test.each([[[1, 2, 3, 4, 5]], [[1, 2, 3, 4, 5, 6, 7]]])(
      '로또 번호(%s)가 6개가 아니면 에러를 발생한다.',
      (numbers) => {
        expect(() => new Lotto(numbers)).toThrow(
          `${ERROR_MESSAGE.prefix}${ERROR_MESSAGE.hasNotLength(VARIABLE_ALIAS.lottoNumbers, OPTIONS.LOTTO.combination)}`
        );
      }
    );

    test.each([[['a', 2, 3, 4, 5, 6]], [[1.1, 2, 3, 4, 5, 6]]])(
      '로또 번호(%s) 중 정수 이외의 값이 있다면 에러를 발생한다.',
      (numbers) => {
        expect(() => new Lotto(numbers)).toThrow();
      }
    );

    test.each([[[1, 2, 3, 4, 5, 46]], [[0, 1, 2, 3, 4, 5]]])(
      '로또 번호(%s)의 범위가 1부터 45 사이가 아니라면 에러를 발생한다.',
      (numbers) => {
        expect(() => new Lotto(numbers)).toThrow();
      }
    );

    test('로또 번호에 중복되는 수가 있다면 에러를 발생한다.', () => {
      const numbers = [1, 1, 2, 3, 4, 5];

      expect(() => new Lotto(numbers)).toThrow();
    });

    test.each([[[3, 2, 4, 5, 6, 1]], [[13, 12, 14, 15, 16, 11]]])(
      '로또 번호는 오름차순으로 정렬된다.',
      (numbers) => {
        const lotto = new Lotto(numbers);

        expect(lotto.getNumbers()).toStrictEqual(numbers.sort());
      }
    );
  });

  describe('로또 당첨 여부 판단 테스트', () => {
    let lottoNumbers;
    let lotto;

    beforeAll(() => {
      lottoNumbers = [1, 2, 3, 4, 5, 6];
      lotto = new Lotto(lottoNumbers);
    });

    test.each([[[1, 2, 3, 4, 5, 6], 7, 1]])(
      '6개의 번호가 일치하면 1등을 반환한다.',
      (winningNumbers, bonusNumber, rank) => {
        expect(lotto.determineRank(winningNumbers, bonusNumber)).toBe(rank);
      }
    );

    test.each([[[1, 2, 3, 4, 5, 45], 6, 2]])(
      '5개의 번호 + 보너스 번호가 일치하면 2등을 반환한다.',
      (winningNumbers, bonusNumber, rank) => {
        expect(lotto.determineRank(winningNumbers, bonusNumber)).toBe(rank);
      }
    );

    test.each([[[1, 2, 3, 4, 5, 45], 7, 3]])(
      '5개의 번호가 일치하고 보너스 번호가 다르면 3등을 반환한다.',
      (winningNumbers, bonusNumber, rank) => {
        expect(lotto.determineRank(winningNumbers, bonusNumber)).toBe(rank);
      }
    );

    test.each([
      [[1, 2, 3, 4, 44, 45], 6, 4],
      [[1, 2, 3, 4, 44, 45], 7, 4]
    ])(
      '4개의 번호가 일치하면 4등을 반환한다.',
      (winningNumbers, bonusNumber, rank) => {
        expect(lotto.determineRank(winningNumbers, bonusNumber)).toBe(rank);
      }
    );

    test.each([
      [[1, 2, 3, 43, 44, 45], 6, 5],
      [[1, 2, 3, 43, 44, 45], 7, 5]
    ])(
      '3개의 번호가 일치하면 5등을 반환한다.',
      (winningNumbers, bonusNumber, rank) => {
        expect(lotto.determineRank(winningNumbers, bonusNumber)).toBe(rank);
      }
    );

    test.each([
      [[1, 2, 42, 43, 44, 45], 6, 6],
      [[1, 2, 42, 43, 44, 45], 7, 6],
      [[1, 41, 42, 43, 44, 45], 6, 6],
      [[1, 41, 42, 43, 44, 45], 7, 6],
      [[40, 41, 42, 43, 44, 45], 6, 6],
      [[40, 41, 42, 43, 44, 45], 7, 6]
    ])(
      '3개 미만의 번호가 일치하면 다음기회에^^.',
      (winningNumbers, bonusNumber, rank) => {
        expect(lotto.determineRank(winningNumbers, bonusNumber)).toBe(rank);
      }
    );
  });
});
