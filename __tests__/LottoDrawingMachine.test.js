import Lotto from "../src/domain/Lotto";
import LottoDrawingMachine from "../src/domain/LottoDrawingMachine";
import WinningLotto from "../src/domain/WinningLotto";

describe("로또추첨기 클래스 테스트", () => {
  test("로또 추첨 기능 테스트", () => {
    const lottoes = [
      [1, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 11],
      [14, 3, 1, 24, 15, 2],
      [2, 1, 3, 4, 5, 12],
      [1, 2, 3, 4, 12, 13],
      [11, 22, 33, 44, 45, 43],
    ].map((numbers) => new Lotto(numbers));
    const winningLotto = new WinningLotto([1, 2, 3, 4, 5, 6], 11);
    const expectedRankings = [1, 2, 5, 3, 4, 0];

    const lottodrawingMachine = new LottoDrawingMachine();
    const rankings = lottodrawingMachine.draw(lottoes, winningLotto);

    expect(rankings).toEqual(expectedRankings);
  });

  test("로또 당첨 수익률 계산 기능 테스트", () => {
    const rankings = [1, 2, 5, 3, 4, 0];

    const lottodrawingMachine = new LottoDrawingMachine();
    const totalProfitRate =
      lottodrawingMachine.calculateTotalProfitRate(rankings);

    expect(totalProfitRate).toBe(33_859_250);
  });
});
