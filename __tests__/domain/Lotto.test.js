/* eslint-disable max-lines-per-function */
import ERROR_MESSAGE from "../../src/constants/error.js";
import { LOTTO_LENGTH, LOTTO_RANGE } from "../../src/constants/option.js";
import Lotto from "../../src/domain/Lotto.js";

describe("Lotto 객체 테스트", () => {
  const createLottoWithNumbers = (numbers) => () => new Lotto(numbers);

  test(`로또 번호는 ${LOTTO_LENGTH}개여야한다.`, () => {
    const INVALID_LOTTO_LENGTH = [1, 2, 3, 4, 5];

    expect(createLottoWithNumbers(INVALID_LOTTO_LENGTH)).toThrow(
      ERROR_MESSAGE.INVALID_LOTTO_NUMBER_LENGTH,
    );
  });

  test("로또 번호 배열에 똑같은 숫자가 있으면 오류를 던진다.", () => {
    const DUPLICATE_LOTTO_NUMBERS = [1, 1, 2, 3, 4, 5];

    expect(createLottoWithNumbers(DUPLICATE_LOTTO_NUMBERS)).toThrow(
      ERROR_MESSAGE.DUPLICATE_LOTTO_NUMBER,
    );
  });

  test(`로또 번호는 ${LOTTO_RANGE.MIN} ~ ${LOTTO_RANGE.MAX} 사이의 숫자가 아니면 에러가 나야된다.`, () => {
    const INVALID_LOTTO_NUMBERS = [0, 1, 2, 3, 4, 46];

    expect(createLottoWithNumbers(INVALID_LOTTO_NUMBERS)).toThrow(
      ERROR_MESSAGE.INVALID_LOTTO_NUMBER_RANGE,
    );
  });

  test("로또 번호는 숫자만 입력할 수 있다.", () => {
    const INVALID_LOTTO_NUMBERS = ["하나", 2, 3, 4, 5, 6];

    expect(createLottoWithNumbers(INVALID_LOTTO_NUMBERS)).toThrow(
      ERROR_MESSAGE.INVALID_LOTTO_NUMBER_TYPE,
    );
  });

  test(`로또 번호는 ${LOTTO_RANGE.MIN} ~ ${LOTTO_RANGE.MAX} 사이의 숫자면 에러가 나지 않는다.`, () => {
    const VALID_LOTTO_NUMBERS = [1, 2, 3, 4, 5, 6];

    expect(createLottoWithNumbers(VALID_LOTTO_NUMBERS)).not.toThrow();
  });
});
