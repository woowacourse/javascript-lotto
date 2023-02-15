import getSortedNumbers from '../src/util/getSortedNumbers.js';

test('오름차순으로 정렬된 배열을 반환해야 한다.', () => {
  // given
  const numbers = [1, 5, 2, 4, 3, 6];

  // when
  const sortedNumbers = getSortedNumbers(numbers, 'ASC');

  // then
  expect(sortedNumbers).toEqual([1, 2, 3, 4, 5, 6]);
});

test('내림차순으로 정렬된 배열을 반환해야 한다.', () => {
  // given
  const numbers = [1, 5, 2, 4, 3, 6];

  // when
  const sortedNumbers = getSortedNumbers(numbers, 'DESC');

  // then
  expect(sortedNumbers).toEqual([6, 5, 4, 3, 2, 1]);
});
