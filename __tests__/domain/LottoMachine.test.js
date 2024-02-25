// LottoMachine.test.js
import OPTIONS from '../../src/constant/Options.js';
import Lotto from '../../src/domain/Lotto.js';
import LottoMachine from '../../src/domain/LottoMachine.js';
import WinningLotto from '../../src/domain/WinningLotto.js';

describe('LottoMachine 단위테스트', () => {
  let lottoMachine;

  beforeEach(() => {
    lottoMachine = new LottoMachine();
  });

  test.each([
    [1000, 1],
    [1999, 1],
    [2000, 2]
  ])('구입 금액(%s)에 따른 발행 수량(%s)을 계산하여 반환한다.', (purchaseAmount, quantity) => {
    expect(lottoMachine.calculateIssueQuantity(purchaseAmount)).toBe(quantity);
  });

  test('지정 수량만큼 로또를 발행하고, 로또 객체의 배열을 반환한다.', () => {
    const issueQuantity = 1;
    const lottos = lottoMachine.issueLottos(issueQuantity);

    expect(Array.isArray(lottos) && lottos.length === issueQuantity).toBe(true);
    expect(lottos.every((lotto) => lotto instanceof Lotto)).toBe(true);
  });

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
    const winningLotto = new WinningLotto(winningNumbers, bonusNumber);

    const winningResult = { ...OPTIONS.WINNING_RESULT, 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1 };

    expect(lottoMachine.determineLottoRanks(lottos, winningLotto)).toStrictEqual(winningResult);
  });

  test.each([
    [{ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 1 }, 0],
    [{ 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1 }, 33859250]
  ])('로또 결과에 따른 수익률을 반환한다.', (winningResult, profitRate) => {
    expect(lottoMachine.calculateProfitRate(winningResult)).toBeCloseTo(profitRate, 2);
  });
});
