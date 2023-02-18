/* eslint-disable */

import getSortedNumbers from '../src/util/getSortedNumbers.js';

describe('배열 반환 테스트', () => {
  test('오름차순으로 정렬된 배열을 반환해야 한다.', () => {
    const numbers = [1, 5, 2, 4, 3, 6];
    const sortedNumbers = getSortedNumbers(numbers, 'ASC');

    expect(sortedNumbers).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test('내림차순으로 정렬된 배열을 반환해야 한다.', () => {
    const numbers = [1, 5, 2, 4, 3, 6];
    const sortedNumbers = getSortedNumbers(numbers, 'DESC');

    expect(sortedNumbers).toEqual([6, 5, 4, 3, 2, 1]);
  });
});
