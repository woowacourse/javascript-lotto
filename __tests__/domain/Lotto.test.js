/* eslint-disable max-lines-per-function */
import ERROR_MESSAGE from "../../src/constants/error-messages.js";
import {
  LOTTO_NUMBER_LENGTH,
  LOTTO_NUMBER_RANGE,
} from "../../src/constants/lotto-constants.js";
import Lotto from "../../src/domain/Lotto.js";

describe("Lotto 객체 테스트", () => {
  const createLottoWithNumbers = (numbers) => () => new Lotto(numbers);

  test(`로또 번호는 ${LOTTO_NUMBER_LENGTH}개여야한다.`, () => {
    const INVALID_LOTTO_LENGTH = [1, 2, 3, 4, 5];

    expect(createLottoWithNumbers(INVALID_LOTTO_LENGTH)).toThrow();
  });

  test("로또 번호 배열에 똑같은 숫자가 있으면 오류를 던진다.", () => {
    const DUPLICATE_LOTTO_NUMBERS = [1, 1, 2, 3, 4, 5];

    expect(createLottoWithNumbers(DUPLICATE_LOTTO_NUMBERS)).toThrow();
  });

  test(`로또 번호는 ${LOTTO_NUMBER_RANGE.MIN} ~ ${LOTTO_NUMBER_RANGE.MAX} 사이의 숫자가 아니면 에러가 나야된다.`, () => {
    const INVALID_LOTTO_NUMBERS = [0, 1, 2, 3, 4, 46];

    expect(createLottoWithNumbers(INVALID_LOTTO_NUMBERS)).toThrow();
  });

  test("로또 번호가 숫자가 아니면 오류를 던진다.", () => {
    const INVALID_LOTTO_NUMBERS = ["하나", 2, 3, 4, 5, 6];

    expect(createLottoWithNumbers(INVALID_LOTTO_NUMBERS)).toThrow();
  });

  test(`로또 번호는 ${LOTTO_NUMBER_RANGE.MIN} ~ ${LOTTO_NUMBER_RANGE.MAX} 사이의 숫자면 에러가 나지 않는다.`, () => {
    const VALID_LOTTO_NUMBERS = [1, 2, 3, 4, 5, 6];

    expect(createLottoWithNumbers(VALID_LOTTO_NUMBERS)).not.toThrow();
  });
});
