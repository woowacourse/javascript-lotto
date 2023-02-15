import NumberHandler from "../../src/util/NumberHandler.js";

describe("NumberHandler 테스트", () => {
  test("번호 6개가 일치하는 경우 6을 리턴한다.", () => {
    const numbers = [1, 2, 3, 4, 5, 6];
    const targetNumbers = [1, 2, 3, 4, 5, 6];

    expect(NumberHandler.getMatchCount(numbers, targetNumbers)).toBe(6);
  });
});
