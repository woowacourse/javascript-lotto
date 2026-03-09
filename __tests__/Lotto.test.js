import Lotto from "../src/domain/Lotto.js";
import { LOTTO_RANGE } from "../src/constants/constant.js";

describe("Lotto", () => {
  const lotto = new Lotto();

  test("Lotto 객체 생성 시, 랜덤 번호 6개를 발급받아 저장한다", () => {
    expect(lotto.getNumber().length).toBe(LOTTO_RANGE.COUNT);
  });

  test("랜덤으로 발급한 로또 번호는 중복되지 않는다.", () => {
    const lottoSet = new Set(lotto.getNumber());
    expect(lottoSet.size).toBe(LOTTO_RANGE.COUNT);
  });

  test("랜덤으로 발급한 번호의 범위는 1 ~ 45이다.", () => {
    lotto.getNumber().forEach((item) => {
      expect(item).toBeGreaterThanOrEqual(1);
      expect(item).toBeLessThanOrEqual(45);
    });
  });
});
