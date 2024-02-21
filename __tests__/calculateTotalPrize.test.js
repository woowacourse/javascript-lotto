import {
  calculateTotalPrize,
  PRIZE,
} from "../src/domain/calculateTotalPrize.js";

describe("등수 배열을 받아 총 수익률을 계산해주는 함수 테스트", () => {
  test("등수 배열을 받아 총 상금을 계산한다.", () => {
    const ranks = [1, 1, 1, 1, 1];
    const expectedTotal = PRIZE.reduce(function add(acc, cur) {
      return acc + cur;
    });
    expect(calculateTotalPrize(ranks)).toBe(expectedTotal);
  });
});
