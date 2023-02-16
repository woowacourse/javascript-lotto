import {
  convertAscending,
  arrayToObjectThatValueZero,
  isNumberInRange,
} from '../src/utils/Utils';

describe('유틸 함수 테스트', () => {
  test('넘겨받은 배열을 오름차순으로 정렬하는지 확인한다', () => {
    // given
    const array = [45, 29, 1, 33, 23, 18];

    // when
    const sortedArray = convertAscending(array);

    //then
    expect(sortedArray).toEqual([1, 18, 23, 29, 33, 45]);
  });

  test('넘겨받은 배열의 요소를 key 값으로 0을 value로 받는 객체 반환 테스트', () => {
    const array = [1, 2, 3, 4, 5, 6];

    const objectThatValueZero = arrayToObjectThatValueZero(array);

    expect(objectThatValueZero).toEqual({
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
    });
  });

  test('숫자가 범위 안에 있는지 확인하는 테스트', () => {
    const number = 3;
    const range = [1, 45];

    const isInRange = isNumberInRange(number, range);

    expect(isInRange).toBeTruthy();
  });
});
