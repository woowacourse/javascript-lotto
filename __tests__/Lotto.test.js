import { ERROR_MESSAGE, LOTTO_NUMBERS_ERROR_MESSAGE } from "../src/constants/errorMessage.js";
import Lotto from "../src/domain/Lotto.js";
import { LOTTO_NUMBERS } from "../src/constants/systemConstants.js";
describe("로또 객체 생성 테스트", () => {
  test("로또 번호는 숫자 배열이 입력되면, 로또 숫자를 필드로 갖는다", () => {
    // given
    const numbers = [1, 2, 3, 4, 5, 6];

    // when
    const lotto = new Lotto(numbers);

    // then
    expect(lotto.numbers).toEqual(numbers);
  });

  test("로또 번호가 6개가 아닐 경우, 에러를 출력한다", () => {
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
  ])("로또 번호가 1에서 45사이 값이 아닐 경우, 에러를 출력한다", (numbers) => {
    expect(() => new Lotto(numbers)).toThrow(LOTTO_NUMBERS_ERROR_MESSAGE.RANGE);
  });
});
