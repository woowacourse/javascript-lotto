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

describe("복권과 당첨번호, 보너스번호를 비교해 등수와 수익률을 반환", () => {
  const lottoGame = new LottoGame(1);
  const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
  lottoGame.lotteries = [lotto];

  test("복권과 당첨번호이 일치하는 개수가 3개인 경우의 등수와 수익률 반환", () => {
    expect(lottoGame.getRankResult([1, 2, 3, 7, 8, 9], 6)).toEqual([
      1,
      0,
      0,
      0,
      0,
      "500.0",
    ]);
  });

  test("복권과 당첨번호이 일치하는 개수가 5개이고 보너스 번호가 불일치하는 경우의 등수와 수익률 반환", () => {
    expect(lottoGame.getRankResult([1, 2, 3, 4, 5, 45], 10)).toEqual([
      0,
      0,
      1,
      0,
      0,
      "150000.0",
    ]);
  });
});
