const LottoGame = require("../src/domain/LottoGame");

describe("로또 게임 기능 테스트", () => {
  test("정상적으로 당첨 번호가 등록되는지 테스트", () => {
    const lottoGame = new LottoGame();
    lottoGame.makeWinLotto([1, 2, 3, 4, 5, 6], 7);
  });
});

describe("당첨 등수 계산 테스트", () => {
  const lottos = [
    [[1, 2, 3, 4, 5, 6], 1],
    [[1, 2, 3, 4, 5, 7], 2],
    [[1, 2, 3, 4, 5, 9], 3],
    [[1, 2, 3, 4, 7, 8], 4],
    [[1, 2, 3, 10, 11, 12], 5],
    [[8, 9, 10, 11, 12, 13], 0],
  ];

  test.each(lottos)(
    "모든 등수가 정상적으로 계산되는 지 테스트",
    (numbers, answer) => {
      const lottoGame = new LottoGame();
      lottoGame.makeWinLotto([1, 2, 3, 4, 5, 6], 7);
      const rank = lottoGame.calculateRank(numbers);
      expect(rank).toEqual(answer);
    }
  );
});
