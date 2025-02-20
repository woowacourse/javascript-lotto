import { getRevenueRate } from "./math.js";

describe("getRevenueRate 함수 테스트", () => {
  test("1000원으로 5만원을 벌면 수익률은 5,000이다.", () => {
    const revenue = 50_000;
    const cost = 1_000;

    expect(getRevenueRate(revenue, cost)).toBe(5_000);
  });

  test("숫자가 아닌 값을 입력하면 에러가 발생한다.", () => {
    expect(() => getRevenueRate("50,000", 1_000)).toThrow(
      "인자가 숫자가 아닙니다."
    );
  });
});
