import { LOTTO_NUMBERS_ERROR_MESSAGE } from '../src/constants/errorMessage.js';
import Lotto from '../src/domain/Lotto.js';
describe('로또 객체 생성 테스트', () => {
  test('로또 번호가 6개가 아닐 경우, 에러를 발생시킨다', () => {
    //given
    const numbers = [1, 2, 3, 4, 5];

    //then
    expect(() => new Lotto(numbers)).toThrow(LOTTO_NUMBERS_ERROR_MESSAGE.LENGTH);
  });

  test.each([
    [
      [1, 3, 5, 6, 7, 46],
      [-2, 3, 4, 0, 56, 2]
    ]
  ])('로또 번호가 1에서 45 사이 값이 아닐 경우, 에러를 발생시킨다', (numbers) => {
    expect(() => new Lotto(numbers)).toThrow(LOTTO_NUMBERS_ERROR_MESSAGE.RANGE);
  });

  test.each([
    [
      [1, 3, 5, 6, 7, 45],
      [10, 15, 20, 25, 30, 45]
    ]
  ])('로또 번호가 1에서 45 사이 값이면, 정상적으로 생성된다', (numbers) => {
    expect(() => new Lotto(numbers)).not.toThrow();
  });

  test.each([
    [
      [1, 1, 2, 3, 4, 5],
      [1, 2, 3, 3, 5, 6]
    ]
  ])('로또 번호에 중복이 있는 경우, 에러를 발생시킨다', (numbers) => {
    expect(() => new Lotto(numbers)).toThrow(LOTTO_NUMBERS_ERROR_MESSAGE.DUPLICATE);
  });
});
