import { ERROR_MESSAGE, LOTTO_NUMBERS_ERROR_MESSAGE } from "../src/constants/errorMessage.js";
import Lotto from "../src/domain/Lotto.js";
describe("로또 객체 생성 테스트", () => {
  test("로또 번호는 숫자 배열이 입력되면, 로또 숫자를 필드로 갖는다", () => {
    // given
    const numbers = [1, 2, 3, 4, 5, 6];

    // when
    const lotto = new Lotto(numbers);

    // then
    expect(lotto.numbers).toEqual(numbers);
  });

  test("로또 번호가 6개가 아닐 경우, 에러를 발생시킨다", () => {
    //given
    const numbers = [1, 2, 3, 4, 5];

    //then
    expect(() => new Lotto(numbers)).toThrow(LOTTO_NUMBERS_ERROR_MESSAGE.LENGTH);
  });

  test.each([
    [
      [1, 3, 5, 6, 7, 50],
      [-2, 3, 4, 0, 56, 2],
    ],
  ])("로또 번호가 1에서 45사이 값이 아닐 경우, 에러를 발생시킨다", (numbers) => {
    expect(() => new Lotto(numbers)).toThrow(LOTTO_NUMBERS_ERROR_MESSAGE.RANGE);
  });

  test.each([
    [
      [1, 1, 2, 3, 4, 5],
      [1, 2, 3, 3, 5, 6],
    ],
  ])("로또 번호에 중복이 있는 경우, 에러를 발생시킨다", (numbers) => {
    expect(() => new Lotto(numbers)).toThrow(LOTTO_NUMBERS_ERROR_MESSAGE.DUPLICATE);
  });

  test.each([
    [
      [1, 10, 3, 5, 15, 8],
      [1, 3, 5, 8, 10, 15],
    ],
    [
      [3, 16, 2, 10, 34, 39],
      [2, 3, 10, 16, 34, 39],
    ],
  ])("로또 숫자는 오름차순으로 정렬되어야한다", (numbers, expectedNumbers) => {
    const lotto = new Lotto(numbers);
    expect(lotto.numbers).toEqual(expectedNumbers);
  });
});
