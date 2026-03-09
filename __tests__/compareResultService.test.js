import { compareResultService } from "../src/service/compareResultService.js";
import WinningLotto from "../src/domain/WinningLotto.js";
import Lotto from "../src/domain/Lotto.js";

describe("compareResultService", () => {
  // 당첨 번호
  test.each([
    [[5, 10, 14, 19, 23, 28], "FIRST"],
    [[5, 10, 14, 19, 23, 30], "THIRD"],
    [[5, 10, 14, 19, 31, 32], "FOURTH"],
    [[5, 10, 14, 31, 32, 33], "FIFTH"],
  ])(
    "당첨 번호와 비교하여 올바른 결과가 도출된다.",
    (winningNumbers, expectedRank) => {
      const spy = jest
        .spyOn(Math, "random")
        .mockReturnValueOnce(0.1) // 5
        .mockReturnValueOnce(0.2) // 10
        .mockReturnValueOnce(0.3) // 14
        .mockReturnValueOnce(0.4) // 19
        .mockReturnValueOnce(0.5) // 23
        .mockReturnValueOnce(0.6); // 28

      const newLotto = [new Lotto()];
      const winningLotto = new WinningLotto(winningNumbers.join(","), "29");

      const result = compareResultService(newLotto, winningLotto);

      expect(result[expectedRank]).toBe(1);

      spy.mockRestore();
    },
  );
});
