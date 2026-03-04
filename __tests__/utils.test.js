import { generateRandomNumber } from "../src/utils";

const mockMathRandom = jest.spyOn(Math, "random").mockReturnValue(0.5);

describe("utils 유닛테스트", () => {
  describe("generateRandomNumber", () => {
    test("1부터 주어진 값까지의 랜덤한 양의 정수를 반환한다.", () => {
      // given
      const to = 45;

      // when
      const result = generateRandomNumber(to);

      // then
      expect(result).toBe(23);
    });
  });

  afterAll(() => {
    mockMathRandom.mockRestore();
  });
});
