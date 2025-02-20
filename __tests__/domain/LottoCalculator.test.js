import Lotto from "../../src/domain/lotto.js";
import LottoCalculator from "../../src/domain/lottoCalculator.js";

describe("로또 등수 계산", () => {
  const winningNumbers = [1, 2, 3, 4, 5, 6];
  const bonusNumber = 7;
  const lottoCalculator = new LottoCalculator(winningNumbers, bonusNumber);

  test("1등 조건 일치 확인", () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);

    lottoCalculator.calculatePrize(lotto);

    expect(lottoCalculator.prize.get(1)[0]).toBe(lotto);
  });

  test("2등 조건 일치 확인", () => {
    const lotto = new Lotto([2, 3, 4, 5, 6, 7]);

    lottoCalculator.calculatePrize(lotto);

    expect(lottoCalculator.prize.get(2)[0]).toBe(lotto);
  });

  test("3등 조건 일치 확인", () => {
    const lotto = new Lotto([2, 3, 4, 5, 6, 8]);

    lottoCalculator.calculatePrize(lotto);

    expect(lottoCalculator.prize.get(3)[0]).toBe(lotto);
  });
  test("4등 조건 일치 확인", () => {
    const lotto = new Lotto([3, 4, 5, 6, 8, 9]);

    lottoCalculator.calculatePrize(lotto);

    expect(lottoCalculator.prize.get(4)[0]).toBe(lotto);
  });
  test("5등 조건 일치 확인", () => {
    const lotto = new Lotto([4, 5, 6, 8, 9, 10]);

    lottoCalculator.calculatePrize(lotto);

    expect(lottoCalculator.prize.get(5)[0]).toBe(lotto);
  });
});
