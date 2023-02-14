const LottoGame = require("../src/LottoGame");

describe("구매 금액 입력 시 복권 생성", () => {
  test("구매 금액 입력 시 복권 생성되는 케이스", () => {
    const lottoGame = new LottoGame();
    lottoGame.generateLotteries(8);
    const lottoSize = lottoGame.lotteries.length;
    expect(lottoSize).toEqual(8);
  });

  test("구매 금액 입력 시 복권 생성되는 케이스", () => {
    const lottoGame = new LottoGame();
    lottoGame.generateLotteries(7);
    const lottoSize = lottoGame.lotteries.length;
    expect(lottoSize).toEqual(7);
  });
});
