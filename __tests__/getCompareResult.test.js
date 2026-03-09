import { getCompareResult } from "../src/service/getCompareResult.js";
import WinningLotto from "../src/domain/WinningLotto.js";
import Lotto from "../src/domain/Lotto.js";

describe("getCompareResult", () => {
  const winningLotto = new WinningLotto("1,2,3,4,5,6", "7");

  test.each([
    [[1, 2, 3, 4, 5, 6], "FIRST"],
    [[1, 2, 3, 4, 5, 7], "SECOND"],
    [[1, 2, 3, 4, 5, 10], "THIRD"],
    [[1, 2, 3, 4, 10, 11], "FOURTH"],
    [[1, 2, 3, 9, 10, 11], "FIFTH"],
  ])(
    "당첨 번호와 비교하여 올바른 결과가 도출된다.",
    (lottoNumbers, expectedRank) => {
      const userLottos = [new Lotto(lottoNumbers)];
      const result = getCompareResult(userLottos, winningLotto);

      // count 객체 중 해당 등수만 1인지 검증
      expect(result[expectedRank]).toBe(1);
    },
  );

  test("여러 로또 결과가 합산되어 올바른 count를 반환한다.", () => {
    const lottoArray = [
      [1, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 7],
      [1, 2, 3, 4, 5, 10],
      [1, 2, 3, 4, 10, 11],
      [1, 2, 3, 9, 10, 11],
    ];

    const userLottos = lottoArray.map((lotto) => {
      return new Lotto(lotto);
    });

    const result = getCompareResult(userLottos, winningLotto);

    expect(result).toEqual({
      FIRST: 1,
      SECOND: 1,
      THIRD: 1,
      FOURTH: 1,
      FIFTH: 1,
    });
  });
});
