import Lotto from "../src/domain/Lotto.js";
import LottoComparer from "../src/domain/LottoComparer.js";
import LottoPrize from "../src/domain/LottoPrize.js";

let lottoComparer;
let lottoPrize;

beforeEach(() => {
  const userLottos = [
    new Lotto([1, 2, 3, 4, 5, 6]),
    new Lotto([1, 3, 4, 5, 6, 10]),
    new Lotto([1, 3, 4, 5, 6, 7]),
    new Lotto([1, 4, 5, 6, 7, 8]),
    new Lotto([1, 5, 6, 7, 8, 9]),
    new Lotto([1, 6, 7, 8, 9, 10]),
    new Lotto([1, 7, 8, 9, 10, 11]),
  ];
  const winningNumber = [1, 2, 3, 4, 5, 6];
  const bonusNumber = 7;
  const winningLotto = {
    winningNumbers: winningNumber,
    bonusNumber: bonusNumber,
  };

  lottoComparer = new LottoComparer(userLottos, winningLotto);

  const countResults = lottoComparer.countMatchingNumbers();
  lottoPrize = new LottoPrize(countResults);
  lottoPrize.calculateWinnings(countResults);
});

test("당첨 내역을 계산한다.", () => {
  expect(lottoPrize.prizeResult).toEqual({
    firstPrize: 1,
    secondPrize: 1,
    thirdPrize: 1,
    fourthPrize: 1,
    fifthPrize: 1,
  });
});

test("로또 수익률을 게산한다", () => {
  const price = 7000;
  expect(lottoPrize.calculateROI(price)).toBe("29022114.29");
});
