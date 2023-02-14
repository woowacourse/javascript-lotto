import { convertAscending } from '../src/utils/Utils';

test('넘겨받은 배열을 오름차순으로 정렬하는지 확인한다', () => {
  // given
  const array = [45, 29, 1, 33, 23, 18];

  // when
  const sortedArray = convertAscending(array);

  //then
  expect(sortedArray).toEqual([1, 18, 23, 29, 33, 45]);
});
