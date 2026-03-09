import Lotto from "../src/domain/Lotto.js";
import WinningLotto from "../src/domain/WinningLotto.js";
import { LOTTO_RANGE } from "../src/constants/constant.js";

describe("Lotto", () => {
  const lotto = new Lotto();

  test("Lotto 객체 생성 시, 랜덤 번호 6개를 발급받아 저장한다", () => {
    expect(lotto.getRandomLotto().length).toBe(LOTTO_RANGE.COUNT);
  });

  test("랜덤으로 발급한 로또 번호는 중복되지 않는다.", () => {
    const lottoSet = new Set(lotto.getRandomLotto());
    expect(lottoSet.size).toBe(LOTTO_RANGE.COUNT);
  });

  test("랜덤으로 발급한 번호의 범위는 1 ~ 45이다.", () => {
    lotto.getRandomLotto().forEach((item) => {
      expect(item).toBeGreaterThanOrEqual(1);
      expect(item).toBeLessThanOrEqual(45);
    });
  });

  test("로또 번호는 오름차순으로 저장된다.", () => {
    const numbers = lotto.getRandomLotto();
    const isEqual = numbers === numbers.sort((a, b) => a - b);
    expect(isEqual).toBe(true);
  });

  test.each([
    // 정답 로또
    [[5, 10, 14, 19, 23, 28], "FIRST"],
    [[5, 10, 14, 19, 23, 30], "THIRD"],
    [[5, 10, 14, 19, 31, 32], "FOURTH"],
    [[5, 10, 14, 31, 32, 33], "FIFTH"],
  ])(
    "당첨 번호와 비교하여 올바른 결과가 도출된다.",
    (winningNumbers, expectedRank) => {
      // 랜덤 로또
      const spy = jest
        .spyOn(Math, "random")
        .mockReturnValueOnce(0.1) // 5
        .mockReturnValueOnce(0.2) // 10
        .mockReturnValueOnce(0.3) // 14
        .mockReturnValueOnce(0.4) // 19
        .mockReturnValueOnce(0.5) // 23
        .mockReturnValueOnce(0.6); // 28

      const newLotto = new Lotto();
      const winningLotto = new WinningLotto(winningNumbers.join(","), "29");

      expect(newLotto.getRank(winningLotto)).toBe(expectedRank);

      spy.mockRestore();
    },
  );

  test("당첨 번호 5개와 보너스 번호가 같으면 SECOND를 반환한다.", () => {
    const spy = jest
      .spyOn(Math, "random")
      .mockReturnValueOnce(0.1) // 5
      .mockReturnValueOnce(0.2) // 10
      .mockReturnValueOnce(0.3) // 14
      .mockReturnValueOnce(0.4) // 19
      .mockReturnValueOnce(0.5) // 23
      .mockReturnValueOnce(0.6); // 28

    const newLotto = new Lotto();

    const winningLotto = new WinningLotto("5,10,14,19,23,30", "28");

    expect(newLotto.getRank(winningLotto)).toBe("SECOND");

    spy.mockRestore();
  });
});
