import { ERROR_MESSAGE } from '../../src/constants/MESSAGES';
import Lotto from '../../src/domains/Lotto';
import WinningResult from '../../src/domains/WinningResult';

describe('당첨 결과 테스트', () => {
  describe('정상 케이스', () => {
    const lottos = [
      new Lotto([1, 2, 3, 4, 5, 6]),
      new Lotto([1, 2, 3, 4, 5, 7]),
      new Lotto([1, 2, 3, 4, 5, 8]),
      new Lotto([1, 2, 3, 4, 8, 9]),
      new Lotto([1, 2, 3, 10, 11, 12]),
      new Lotto([1, 2, 13, 14, 15, 16]),
      new Lotto([1, 17, 18, 19, 20, 21]),
    ];
    const winningLotto = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;
    const winningResult = new WinningResult(winningLotto, bonusNumber);

    test('사용자가 구입한 로또 번호와 당첨 번호를 비교하여 당첨 등수별 수량을 계산할 수 있다.', () => {
      const result = winningResult.calculate(lottos);
      expect(result).toEqual([1, 1, 1, 1, 1]);
    });

    test('사용자가 구입한 로또 번호와 당첨 번호를 비교하여 총 수익률을 계산할 수 있다.', () => {
      const lottoPurchasePrice = 10000;
      const result = [1, 1, 1, 1, 1];
      const profitRate = winningResult.calculateProfitRate(lottoPurchasePrice, result);

      expect(profitRate).toBe(20315450);
    });
  });

  describe('예외 케이스', () => {
    test.each([
      {
        description: '당첨 번호가 숫자가 아니면',
        numbers: [null, 1, 2, 3, 4, 5],
        expectedError: ERROR_MESSAGE.LOTTO.INVALID_TYPE,
      },
      {
        description: '당첨 번호가 6개가 아니면',
        numbers: [1, 2, 3, 4, 5],
        expectedError: ERROR_MESSAGE.LOTTO.INVALID_LENGTH,
      },
      {
        description: '당첨 번호의 범위가 1~45 사이가 아니면',
        numbers: [0, 2, 3, 4, 5, 46],
        expectedError: ERROR_MESSAGE.LOTTO.INVALID_RANGE,
      },
      {
        description: '당첨 번호가 중복되면',
        numbers: [1, 2, 3, 4, 5, 5],
        expectedError: ERROR_MESSAGE.LOTTO.DUPLICATE,
      },
    ])('$description 에러가 발생한다', ({ numbers, expectedError }) => {
      expect(() => new Lotto(numbers)).toThrow(expectedError);
    });

    test('보너스 번호가 당첨 번호와 중복되면 에러가 발생한다.', () => {
      const winningLotto = [1, 2, 3, 4, 5, 6];
      const bonusNumber = 6;

      expect(() => new WinningResult(winningLotto, bonusNumber)).toThrow(
        ERROR_MESSAGE.BONUS_NUMBER.DUPLICATE,
      );
    });
  });
});
