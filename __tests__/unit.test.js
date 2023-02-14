import { generateRandomNumber } from "../src/generateRandomNumber";

describe("로또를 뽑는 기능", () => {
  test("랜덤한 숫자가 범위 안에 있다.", () => {
    const number = generateRandomNumber();

    expect(number).toBeLessThan(46);
    expect(number).toBeGreaterThan(0);
  });
});
