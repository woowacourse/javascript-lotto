import LottoPrize from "../src/domain/LottoPrize.js";

let lottoPrize;

beforeEach(() => {
  const compareResult = [
    {
      matchCount: 6,
      hasBonus: false,
    },
    {
      matchCount: 5,
      hasBonus: true,
    },
    {
      matchCount: 5,
      hasBonus: false,
    },
    {
      matchCount: 4,
      hasBonus: false,
    },
    {
      matchCount: 3,
      hasBonus: false,
    },
  ];
  lottoPrize = new LottoPrize();
  lottoPrize.calculateTotalPrizeCount(compareResult);
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
