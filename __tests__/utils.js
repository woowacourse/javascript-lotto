import { getIntersectCount } from "../src/lib/utils.js";

describe("utils", () => {
  describe("getIntersectCount를 테스트한다.", () => {
    test("두 배열을 비교해서 일치하는 개수를 반환한다.", () => {
      const lottoNumbers = [1, 2, 3, 4, 5, 6];
      const userNumbers = [1, 2, 3, 7, 8, 9];

      const intersectCount = getIntersectCount(lottoNumbers, userNumbers);

      expect(intersectCount).toBe(3);
    });
  });
});
