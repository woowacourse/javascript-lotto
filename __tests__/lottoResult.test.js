import LottoResult from "../src/step1/model/LottoResult.js";
import { RANK } from "../src/step1/constant/index.js";

describe("수익률 계산 테스트", () => {
  test("1등이 2개, 2등이 1개, 3등이 1개, 4등이 0개, 5등이 1개 인 경우 80630100를 반환한다.", () => {
    const result = new LottoResult({
      [RANK.FIRST]: 2,
      [RANK.SECOND]: 1,
      [RANK.THIRD]: 1,
      [RANK.FOURTH]: 0,
      [RANK.FIFTH]: 1,
    });
    expect(result.getReturnOnInvestment(5000)).toBe(80630100);
  });
});
