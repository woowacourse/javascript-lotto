import { getRevenueRate, roundNumber } from "./math.js";

describe("getRevenueRate 함수 테스트", () => {
  test("1000원으로 5만원을 벌면 수익률은 5,000이다.", () => {
    const revenue = 50_000;
    const cost = 1_000;

    expect(getRevenueRate(revenue, cost)).toBe(5_000);
  });
});

describe("roundNumber 함수 테스트", () => {
  test("0.001을 소수 둘째 자리까지 반올림하면 0이다.", () => {
    const number = 0.001;
    const roundDigits = 2;

    expect(roundNumber(number, roundDigits)).toBe(0);
  });

  test("0.065을 소수 첫째 자리까지 반올림하면 0.1이다.", () => {
    const number = 0.065;
    const roundDigits = 1;

    expect(roundNumber(number, roundDigits)).toBe(0.1);
  });
});
