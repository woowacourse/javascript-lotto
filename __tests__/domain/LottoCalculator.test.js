import Lotto from "../../src/domain/lotto.js";
import LottoCalculator from "../../src/domain/lottoCalculator.js";

describe("로또 등수 계산", () => {
  const winningNumbers = [1, 2, 3, 4, 5, 6];
  const bonusNumber = 7;

  test("1등 조건 일치 확인", () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const lottoCalculator = new LottoCalculator(winningNumbers, bonusNumber);

    lottoCalculator.calculatePrize(lotto);

    expect(lottoCalculator.prize.get(1)[0]).toBe(lotto);
  });

  test("2등 조건 일치 확인", () => {
    const lotto = new Lotto([2, 3, 4, 5, 6, 7]);
    const lottoCalculator = new LottoCalculator(winningNumbers, bonusNumber);

    lottoCalculator.calculatePrize(lotto);

    expect(lottoCalculator.prize.get(2)[0]).toBe(lotto);
  });

  test("3등 조건 일치 확인", () => {
    const lotto = new Lotto([2, 3, 4, 5, 6, 8]);
    const lottoCalculator = new LottoCalculator(winningNumbers, bonusNumber);

    lottoCalculator.calculatePrize(lotto);

    expect(lottoCalculator.prize.get(3)[0]).toBe(lotto);
  });
  test("4등 조건 일치 확인", () => {
    const lotto = new Lotto([3, 4, 5, 6, 8, 9]);
    const lottoCalculator = new LottoCalculator(winningNumbers, bonusNumber);

    lottoCalculator.calculatePrize(lotto);

    expect(lottoCalculator.prize.get(4)[0]).toBe(lotto);
  });
  test("5등 조건 일치 확인", () => {
    const lotto = new Lotto([4, 5, 6, 8, 9, 10]);
    const lottoCalculator = new LottoCalculator(winningNumbers, bonusNumber);

    lottoCalculator.calculatePrize(lotto);

    expect(lottoCalculator.prize.get(5)[0]).toBe(lotto);
  });

  test("등수에따른 수익 금액을 확인한다.", () => {
    const lotto = new Lotto([4, 5, 6, 8, 9, 10]);
    const lottoCalculator = new LottoCalculator(winningNumbers, bonusNumber);

    lottoCalculator.calculatePrize(lotto);
    lottoCalculator.calculateTotalPrice();

    expect(lottoCalculator.totalPrice).toBe(5000);
  });

  test("계산된 수익 금액을 바탕으로 수익률을 계산한다.", () => {
    const lotto = new Lotto([4, 5, 6, 8, 9, 10]);
    const lottoCalculator = new LottoCalculator(winningNumbers, bonusNumber);
    const purchaseMoney = 1_000;

    lottoCalculator.calculatePrize(lotto);
    lottoCalculator.calculateTotalPrice();

    expect(lottoCalculator.calculateProfit(purchaseMoney)).toBe(500);
  });
});
