import arrayHandler from '../../src/utils/arrayHandler.js';

describe('arrayHandler테스트', () => {
  test.each([
    [
      [5, 4, 3, 2, 1],
      [5, 4, 3, 1, 2],
      [1, 2, 3, 4, 5],
    ],
  ])('입력 배열을 오름차순 정렬하여 반환한다.', numbers => {
    const ascendingOrderSortedNumbers = [1, 2, 3, 4, 5];

    expect(arrayHandler.sortAscendingOrder(numbers)).toEqual(ascendingOrderSortedNumbers);
  });

  test.each([
    [[1, 2, 3, 4, 5, 6], 6],
    [[1, 2, 3, 4, 5, 7], 5],
    [[1, 2, 3, 4, 8, 7], 4],
    [[1, 2, 3, 9, 8, 7], 3],
    [[1, 2, 10, 9, 8, 7], 2],
    [[1, 11, 10, 9, 8, 7], 1],
    [[12, 11, 10, 9, 8, 7], 0],
  ])('두 배열의 일치하는 숫자 개수를 반환한다. ', (numbers, matchCount) => {
    const targetNumbers = [1, 2, 3, 4, 5, 6];

    expect(arrayHandler.getMatchCount(numbers, targetNumbers)).toBe(matchCount);
  });
});
