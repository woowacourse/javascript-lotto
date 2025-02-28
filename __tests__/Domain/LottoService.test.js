import LottoService from '../../src/Domain/LottoService.js';
import { LOTTO_PRIZE_MONEY_DEFINITION } from '../../src/Domain/Constant/definition.js';

describe('LottoService 유효성 검사', () => {
  describe('로또 초기화', () => {
    test('구매 금액으로 로또를 초기화한다.', () => {
      const purchaseAmount = 5000;
      const { lottoManager, lottoTickets } =
        LottoService.initializeLotto(purchaseAmount);

      expect(lottoTickets).toBe(5);
      expect(lottoManager.getLottoList().length).toBe(5);
    });

    test('잘못된 구매 금액으로 로또를 초기화하면 에러가 발생한다.', () => {
      const invalidPurchaseAmount = 1500;

      expect(() => {
        LottoService.initializeLotto(invalidPurchaseAmount);
      }).toThrow();
    });
  });

  describe('당첨 로또 초기화', () => {
    test('당첨 번호와 보너스 번호로 당첨 로또를 생성한다.', () => {
      const winningNumbers = [1, 2, 3, 4, 5, 6];
      const bonusNumber = 7;

      const winningLotto = LottoService.initializeWinningLotto(
        winningNumbers,
        bonusNumber
      );

      expect(winningLotto.getNumbers()).toEqual(winningNumbers);
      expect(winningLotto.getBonusNumber()).toBe(bonusNumber);
    });

    test('잘못된 당첨 번호로 당첨 로또를 생성하면 에러가 발생한다.', () => {
      const invalidWinningNumbers = [1, 2, 3, 4, 5];
      const bonusNumber = 7;

      expect(() => {
        LottoService.initializeWinningLotto(invalidWinningNumbers, bonusNumber);
      }).toThrow();
    });

    test('잘못된 보너스 번호로 당첨 로또를 생성하면 에러가 발생한다.', () => {
      const winningNumbers = [1, 2, 3, 4, 5, 6];
      const invalidBonusNumber = 1;

      expect(() => {
        LottoService.initializeWinningLotto(winningNumbers, invalidBonusNumber);
      }).toThrow();
    });
  });

  describe('당첨 결과 처리', () => {
    test('당첨 결과와 구매 금액으로 수익률을 계산한다.', () => {
      const lottoResult = {
        FIRST_PRIZE: 1,
        SECOND_PRIZE: 0,
        THIRD_PRIZE: 0,
        FOURTH_PRIZE: 0,
        FIFTH_PRIZE: 0,
        NONE: 0,
      };
      const purchaseAmount = 5000;

      const profit = LottoService.processWinningLotto(
        lottoResult,
        purchaseAmount
      );

      const expectedProfit = LOTTO_PRIZE_MONEY_DEFINITION.FIRST_PRIZE / 50;
      expect(profit).toBe(expectedProfit);
    });
  });
});
