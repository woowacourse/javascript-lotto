import { NO_WINNING } from "../src/lib/constants.js";
import {
  calculateMatchCount,
  checkUniqueArray,
  generateUniqueNumberArray,
  getIntersectCount,
  retryUntilSuccess,
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

    describe("retryUntilSuccess를 테스트한다.", () => {
      test("에러 이후에도 재입력 받을 수 있는지 체크한다.", async () => {
        let i = 0;

        await retryUntilSuccess(() => {
          if (++i < 3) throw new Error();
        });

        expect(i).toBe(3);
      });
    });
  });
  describe("calculateMatchCount를 테스트한다", () => {
    test("배열에서 몇 개가 일치하는 지를 계산한다.", () => {
      const matchCount = calculateMatchCount([1, 1, 2, 2, 3, NO_WINNING], 1);

      expect(matchCount).toBe(2);
    });
  });
});
