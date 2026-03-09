import { getReturnRate } from "../src/utils/getReturnRate";

describe("수익률 계산 테스트", () => {
  test("당첨 내역이 [0,2,1,1,1,1], 구매금액 7000 -> 57593642.9", () => {
    expect(getReturnRate([0, 2, 1, 1, 1, 1], 7000)).toBe(57593642.9);
  });

  test("전부 낙첨, 구매금액 5000 -> 0", () => {
    expect(getReturnRate([0, 0, 0, 0, 0, 0], 5000)).toBe(0);
  });
});
