import { calculator } from "../src/domain/calculator.js";

describe("calculator 테스트", () => {
  const testCases = [
    [
      {
        divisor: 10,
        dividend: 2,
      },
      5,
    ],
    [
      {
        divisor: 9,
        dividend: 3,
      },
      3,
    ],
  ];

  test.each(testCases)(
    "입력값이 %o일 때, getQuotient의 결과는 %p이다.",
    ({ divisor, dividend }, expectedQuotient) => {
      expect(calculator.getQuotient(divisor, dividend)).toBe(expectedQuotient);
    },
  );

  const profitTestCases = [
    [
      {
        prizeMoney: 100000,
        cost: 5000,
      },
      "2000.0",
    ],
    [
      {
        prizeMoney: 3000,
        cost: 1000,
      },
      "300.0",
    ],
  ];

  test.each(profitTestCases)(
    "입력값이 %o일 때, getProfits의 결과는 %p이다.",
    ({ prizeMoney, cost }, expectedProfits) => {
      expect(calculator.getProfits(prizeMoney, cost)).toBe(expectedProfits);
    },
  );
});
