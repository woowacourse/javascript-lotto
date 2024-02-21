/* eslint-disable max-lines-per-function */
import Lotto from "../../src/domain/Lotto.js";

describe("Lotto 객체 테스트", () => {
  test("로또 번호는 6개여야한다.", () => {
    const INVALID_LOTTO_LENGTH = [1, 2, 3, 4, 5];

    expect(() => new Lotto(INVALID_LOTTO_LENGTH)).toThrow(
      "[ERROR] 로또 번호로 6개를 입력해주세요.",
    );
  });

  test("로또 번호는 중복되면 안된다.", () => {
    const DUPLICATE_LOTTO_NUMBERS = [1, 1, 2, 3, 4, 5];

    expect(() => new Lotto(DUPLICATE_LOTTO_NUMBERS)).toThrow(
      "[ERROR] 로또 번호에 중복된 숫자가 있습니다.",
    );
  });

  test("로또 번호는 1 ~ 45 사이의 숫자가 아니면 에러가 나야된다.", () => {
    const INVALID_LOTTO_NUMBERS = [0, 1, 2, 3, 4, 46];

    expect(() => new Lotto(INVALID_LOTTO_NUMBERS)).toThrow(
      "[ERROR] 로또 번호로 1 ~ 45 사이의 숫자를 입력해주세요.",
    );
  });

  test("로또 번호는 1 ~ 45 사이의 숫자면 에러가 나지 않는다.", () => {
    const VALID_LOTTO_NUMBERS = [1, 2, 3, 4, 5, 6];

    expect(() => new Lotto(VALID_LOTTO_NUMBERS)).not.toThrow();
  });
});
