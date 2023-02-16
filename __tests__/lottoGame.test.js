const LottoGame = require("../src/domain/LottoGame");
const Lotto = require("../src/domain/Lotto");

describe("구매 금액 입력 시 복권 생성", () => {
  test("구매 금액 입력 시 복권 생성되는 케이스", () => {
    const lottoGame = new LottoGame(8000);
    const lottoSize = lottoGame.lotteries.length;
    expect(lottoSize).toEqual(8);
  });

  test("구매 금액 입력 시 복권 생성되는 케이스", () => {
    const lottoGame = new LottoGame(1000);
    const lottoSize = lottoGame.lotteries.length;
    expect(lottoSize).toEqual(1);
  });
});
