import Lotto from "../src/step1/model/Lotto.js";
import { LOTTO_ERROR_MESSAGE } from "../src/step1/constant/message.js";

describe("로또 테스트", () => {
  test.each([
    [[1, 2, 3, 4, 5], "5개"],
    [[1, 2, 3, 4, 5, 45, 6], "7개"],
    [[], "0개"],
  ])("로또 번호가 6개가 아닌 경우 예외가 발생한다. (%s)", (numbers) => {
    expect(() => {
      new Lotto(numbers);
    }).toThrow(LOTTO_ERROR_MESSAGE.INPUT_NOT_SIX_NUMBERSS);
  });

  test("로또 번호 중 중복되는 숫자가 있는 경우 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 5]);
    }).toThrow(LOTTO_ERROR_MESSAGE.INPUT_DUPLICATE);
  });

  test("로또 번호가 1에서 45 사이의 숫자가 아닌 경우 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 46]);
    }).toThrow(LOTTO_ERROR_MESSAGE.INPUT_RANGE);
  });

  test("로또 번호에 NaN인 경우 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, NaN]);
    }).toThrow(LOTTO_ERROR_MESSAGE.INPUT_RANGE);
  });

  test("로또 번호가 오름차순으로 정렬되어야 한다.", () => {
    const lotto = new Lotto([6, 5, 4, 3, 2, 1]);
    expect(lotto.getNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
