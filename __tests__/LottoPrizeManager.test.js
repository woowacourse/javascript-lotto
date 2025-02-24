import Lotto from "../src/domain/Lotto.js";
import LottoManager from "../src/domain/LottoManager.js";
import LottoPrize from "../src/domain/LottoPrize.js";

let lottoPrize;
beforeEach(() => {
  const lottos = [
    new Lotto([1, 2, 3, 4, 5, 6]),
    new Lotto([1, 3, 4, 5, 6, 10]),
    new Lotto([1, 3, 4, 5, 6, 7]),
    new Lotto([1, 4, 5, 6, 7, 8]),
    new Lotto([1, 5, 6, 7, 8, 9]),
    new Lotto([1, 6, 7, 8, 9, 10]),
    new Lotto([1, 7, 8, 9, 10, 11]),
  ];
  lottoPrize = new LottoPrize(lottos);
});

test("당첨 내역을 계산한다.", () => {
  const winningNumbers = [1, 2, 3, 4, 5, 6];
  const bonusNumber = 7;
  const prizeResult = lottoPrize.calculateWinnings(winningNumbers, bonusNumber);
  expect(prizeResult).toEqual({
    6: 1,
    "5+bonus": 1,
    5: 1,
    4: 1,
    3: 1,
  });
});

test("로또 수익률을 게산한다", () => {
  const price = 7000;
  const winningNumbers = [1, 2, 3, 4, 5, 6];
  const bonusNumber = 7;
  const prizeResult = lottoPrize.calculateWinnings(winningNumbers, bonusNumber);

  expect(lottoPrize.calculateROI(price, prizeResult)).toBe("29022114.29");
});
