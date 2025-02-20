import Lotto from "../../src/domain/lotto.js";
import LottoCalculator from "../../src/domain/lottoCalculator.js";

describe("로또 등수 계산", () => {
  const winningNumbers = [1, 2, 3, 4, 5, 6];
  const bonusNumber = 7;

  test("1등 조건 일치 확인", () => {
    const lottoCalculator = new LottoCalculator(winningNumbers, bonusNumber);
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);

    lottoCalculator.calculatePrize(lotto);

    expect(lottoCalculator.prize.get(1)[0]).toBe(lotto);
  });
});
