/* eslint-disable max-lines-per-function */
import { ERROR_MESSAGES, VARIABLE_ALIAS } from '../src/constant/Messages.js';
import OPTIONS from '../src/constant/Options.js';
import Lotto from '../src/domain/Lotto.js';
import LottoMachine from '../src/domain/LottoMachine';

// TODO: calculateIssueQuantity 함수를 private 함수로 변경
describe('LottoMachine 단위테스트', () => {
  let lottoMachine;

  beforeEach(() => {
    lottoMachine = new LottoMachine();
  });

  describe('구입 금액에 따른 구입 가능 수량 계산 테스트', () => {
    test.each(['a', 1.1])(
      '구입 금액(%s)이 정수가 아니라면 에러를 발생시킨다.',
      (purchaseAmount) => {
        expect(() => lottoMachine.calculateIssueQuantity(purchaseAmount)).toThrow(
          `${ERROR_MESSAGES.prefix}${ERROR_MESSAGES.isNotInteger(VARIABLE_ALIAS.purchaseAmount)}`
        );
      }
    );

    test('구입 금액이 1000 미만이라면 에러를 발생시킨다.', () => {
      const purchaseAmount = 999;

      expect(() => lottoMachine.calculateIssueQuantity(purchaseAmount)).toThrow(
        `${ERROR_MESSAGES.prefix}${ERROR_MESSAGES.isNotAtLeast(VARIABLE_ALIAS.purchaseAmount, OPTIONS.LOTTO.price)}`
      );
    });

    test.each([
      [1000, 1],
      [1999, 1],
      [2000, 2]
    ])('구입 금액(%s)에 따른 발행 수량(%s)을 계산하여 반환한다.', (purchaseAmount, quantity) => {
      expect(lottoMachine.calculateIssueQuantity(purchaseAmount)).toBe(quantity);
    });
  });

  describe('지정 수량 만큼 로또 발행 테스트', () => {
    test('지정 수량만큼 로또를 발행한다.', () => {
      const issueQuantity = 1;
      const lottos = lottoMachine.issueLottos(issueQuantity);

      expect(Array.isArray(lottos) && lottos.length === issueQuantity).toBe(true);
    });

    test('로또 객체의 배열을 반환한다.', () => {
      const issueQuantity = 1;
      const lottos = lottoMachine.issueLottos(issueQuantity);

      expect(lottos.every((lotto) => lotto instanceof Lotto)).toBe(true);
    });
  });

  describe('로또 결과 분석 테스트', () => {
    // TEST: 1. 등수 별 당첨 개수
    test('구입한 로또들의 등수를 분석하여 반환한다.', () => {
      const numbersList = [
        [1, 2, 3, 4, 5, 6],
        [1, 2, 3, 4, 5, 7],
        [1, 2, 3, 4, 5, 45],
        [1, 2, 3, 4, 44, 45],
        [1, 2, 3, 43, 44, 45],
        [1, 2, 42, 43, 44, 45]
      ];
      const lottos = numbersList.map((numbers) => new Lotto(numbers));
      const winningNumbers = [1, 2, 3, 4, 5, 6];
      const bonusNumber = 7;

      const winningResult = { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1 };

      expect(lottoMachine.determineLottoRanks(lottos, winningNumbers, bonusNumber)).toStrictEqual(
        winningResult
      );
    });

    // TEST: 2. 수익률 계산
    test.each([[{ 1: 0, 2: 0, 3: 0, 4: 0, 5: 1, 6: 7 }, 62.5]])(
      '로또 결과에 따른 수익률을 반환한다.',
      (winningResult, profitRate) => {
        expect(lottoMachine.calculateProfitRate(winningResult)).toBe(profitRate);
      }
    );
  });
});
