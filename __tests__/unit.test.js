import getSameElementCount from '../src/utils/getSameElementCount.js';

describe('getSameElementCount() 함수 테스트', () => {
  test('두 배열의 숫자들을 비교하여 같은 숫자의 수를 반환한다.', () => {
    const sameNumberLength = getSameElementCount([1, 2, 3, 4, 5, 6], [4, 5, 6, 7, 8, 9]);
    expect(sameNumberLength).toBe(3);
  });
});
