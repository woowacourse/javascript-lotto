import Lotto from "../../src/domain/lotto.js";
import LottoCalculator from "../../src/domain/lottoCalculator.js";

describe("로또 등수 계산", () => {
  const winningNumbers = [1, 2, 3, 4, 5, 6];
  const bonusNumber = 7;

  test("1등 조건 일치 확인", () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const lottoCalculator = new LottoCalculator(winningNumbers, bonusNumber);

    lottoCalculator.calculatePrize(lotto);

    const firstRankLottos = lottoCalculator.prize.find(
      (prize) => prize.rank === 1
    ).lottos;

    expect(firstRankLottos[0]).toBe(lotto);
  });

  test("2등 조건 일치 확인", () => {
    const lotto = new Lotto([2, 3, 4, 5, 6, 7]);
    const lottoCalculator = new LottoCalculator(winningNumbers, bonusNumber);

    lottoCalculator.calculatePrize(lotto);

    const secondRankLottos = lottoCalculator.prize.find(
      (prize) => prize.rank === 2
    ).lottos;

    expect(secondRankLottos[0]).toBe(lotto);
  });

  test("3등 조건 일치 확인", () => {
    const lotto = new Lotto([2, 3, 4, 5, 6, 8]);
    const lottoCalculator = new LottoCalculator(winningNumbers, bonusNumber);

    lottoCalculator.calculatePrize(lotto);

    const thirdRankLottos = lottoCalculator.prize.find(
      (prize) => prize.rank === 3
    ).lottos;

    expect(thirdRankLottos[0]).toBe(lotto);
  });

  test("4등 조건 일치 확인", () => {
    const lotto = new Lotto([3, 4, 5, 6, 8, 9]);
    const lottoCalculator = new LottoCalculator(winningNumbers, bonusNumber);

    lottoCalculator.calculatePrize(lotto);

    const fourthRankLottos = lottoCalculator.prize.find(
      (prize) => prize.rank === 4
    ).lottos;

    expect(fourthRankLottos[0]).toBe(lotto);
  });

  test("5등 조건 일치 확인", () => {
    const lotto = new Lotto([4, 5, 6, 8, 9, 10]);
    const lottoCalculator = new LottoCalculator(winningNumbers, bonusNumber);

    lottoCalculator.calculatePrize(lotto);

    const fifthRankLottos = lottoCalculator.prize.find(
      (prize) => prize.rank === 5
    ).lottos;

    expect(fifthRankLottos[0]).toBe(lotto);
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
    lottoCalculator.calculateProfit(purchaseMoney);

    expect(lottoCalculator.profit).toBe(500);
  });
});
