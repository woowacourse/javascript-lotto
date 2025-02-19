import {
  checkUniqueArray,
  generateUniqueNumberArray,
  getIntersectCount,
} from "../src/lib/utils.js";

describe("utils", () => {
  describe("getIntersectCount를 테스트한다.", () => {
    test("두 배열을 비교해서 일치하는 개수를 반환한다.", () => {
      const lottoNumbers = [1, 2, 3, 4, 5, 6];
      const userNumbers = [1, 2, 3, 7, 8, 9];

      const intersectCount = getIntersectCount(lottoNumbers, userNumbers);

      expect(intersectCount).toBe(3);
    });
  });

  describe("generateUniqueNumberArray를 테스트한다.", () => {
    test("중복되지 않는 숫자로 구성된 배열을 만든다.", () => {
      const uniqueNumberArray = generateUniqueNumberArray(1, 6, 6);

      expect(uniqueNumberArray).toContain(1);
      expect(uniqueNumberArray).toContain(2);
      expect(uniqueNumberArray).toContain(3);
      expect(uniqueNumberArray).toContain(4);
      expect(uniqueNumberArray).toContain(5);
      expect(uniqueNumberArray).toContain(6);
    });

    describe("checkUniqueArray를 테스트한다.", () => {
      test("중복이 없는 배열인지 체크한다", () => {
        expect(checkUniqueArray([1, 2, 3, 4, 5, 6])).toBeTruthy();
        expect(checkUniqueArray([1, 2, 3, 4, 5, 5])).toBeFalsy();
      });
    });
  });
});
