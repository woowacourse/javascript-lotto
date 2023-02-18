const LottoGame = require("../src/domain/LottoGame");
const Lotto = require("../src/domain/Lotto");

describe("랜덤복권을 생성하고 유저로또복권, 보너스 번호랑 비교해 등수와 수익률을 반환", () => {
  test.each([[[8000, 8]], [[12000, 12]], [[6000, 6]]])(
    "구매 금액 입력 시 복권 생성되는지 확인 %#",
    (testCase) => {
      const lottoGame = new LottoGame(testCase[0]);
      const lottoSize = lottoGame.lotteries.length;
      expect(lottoSize).toEqual(testCase[1]);
    }
  );

  test.each([
    [[[1, 2, 3, 7, 8, 9], 6, [1, 0, 0, 0, 0, "500.0"]]],
    [[[1, 2, 3, 4, 5, 45], 10, [0, 0, 1, 0, 0, "150000.0"]]],
  ])(
    "복권과 당첨번호이 일치하는 개수를 확인해 등수와 수익률 반환 %#",
    (testCase) => {
      const lottoGame = new LottoGame(1);
      const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
      lottoGame.lotteries = [lotto];
      const result = lottoGame.getRankResult(testCase[0], testCase[1]);
      expect(result).toEqual(testCase[2]);
    }
  );
});
