import { deepCopy } from '../utils/copy';

describe('유틸 함수 테스트', () => {
  it('deepCopy 함수는 배열을 인자로 받으면 깊은 복사를 수행한 배열을 반환한다.', () => {
    const array = [1, 2, 3, 4, 5];

    expect(array === deepCopy(array)).toBe(false);
  });
});
