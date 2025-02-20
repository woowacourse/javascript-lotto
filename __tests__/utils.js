import { NO_WINNING } from '../src/lib/constants.js';
import {
  calculateMatchCount,
  checkUniqueArray,
  generateUniqueNumbers,
  getIntersectCount,
  retryUntilSuccess,
} from '../src/lib/utils.js';

describe('utils', () => {
  describe('getIntersectCount', () => {
    test('두 배열을 비교해 일치하는 개수를 반환한다.', () => {
      const lottoNumbers = [1, 2, 3, 4, 5, 6];
      const userNumbers = [1, 2, 3, 7, 8, 9];

      const intersectCount = getIntersectCount(lottoNumbers, userNumbers);

      expect(intersectCount).toBe(3);
    });
  });

  describe('generateUniqueNumbers', () => {
    test('중복되지 않는 숫자로 구성된 배열을 만든다.', () => {
      const uniqueNumbers = generateUniqueNumbers({ start: 1, end: 6 }, 6);

      expect(uniqueNumbers).toEqual(expect.arrayContaining([1, 2, 3, 4, 5, 6]));
    });
  });

  describe('checkUniqueArray', () => {
    test('중복이 없는 배열인지 체크한다.', () => {
      expect(checkUniqueArray([1, 2])).toBeTruthy();
      expect(checkUniqueArray([1, 1])).toBeFalsy();
    });
  });

  describe('retryUntilSuccess', () => {
    test('에러 이후에도 재입력 받을 수 있는지 체크한다.', async () => {
      let i = 0;

      await retryUntilSuccess(() => {
        i += 1;
        if (i < 3) throw new Error();
      });

      expect(i).toBe(3);
    });
  });

  describe('calculateMatchCount', () => {
    test('배열에서 몇 개가 일치하는 지 계산한다.', () => {
      const matchCount = calculateMatchCount([1, 1, 2, 2, 3, NO_WINNING], 1);

      expect(matchCount).toBe(2);
    });
  });
});
