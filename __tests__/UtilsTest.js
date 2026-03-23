import { pickNumberInRange } from "../src/Utils.js";

describe("유틸 함수 테스트", () => {
  test("반환된 배열의 길이가 range와 일치한다", () => {
    const result = pickNumberInRange(1, 45, 7);
    expect(result).toHaveLength(7);
  });
  test("max 경계값(45)이 반환될 수 있다", () => {
    jest.spyOn(global.Math, "random").mockReturnValue(0.9999);
    const result = pickNumberInRange(1, 45, 1);
    expect(result).toContain(45);
  });
});
