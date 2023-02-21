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

describe("복권이 당첨번호, 보너스번호와 몇 개 일치하는지 테스트", () => {
  const lottoGame = new LottoGame(1);
  const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
  lottoGame.lotteries = [lotto];
  test("복권과 당첨번호이 일치하는 개수가 3개인 경우 9 반환 및 보너스번호가 일치하면 true", () => {
    expect(lottoGame.matchLotteries([1, 2, 3, 7, 8, 9], 6)).toEqual([
      [9, true],
    ]);
  });

  test("복권과 당첨번호이 일치하는 개수가 5개인 경우 7 반환 및 보너스 번호가 불일치하면 false", () => {
    expect(lottoGame.matchLotteries([1, 2, 3, 4, 5, 45], 10)).toEqual([
      [7, false],
    ]);
  });
});
