import { ERROR_MESSAGE } from "../../src/constants/error.js";
import { validateLottoNumberRange } from "../../src/domain/validateWinningNumbers.js";

describe("domain/validateWinningNumbers", () => {
  test("입력받은 배열이 모두 1~45 사이의 숫자여야 한다.", () => {
    const numbers = [1, 2, 3, 4, 5, 6];
    expect(() => validateLottoNumberRange(numbers)).not.toThrow();
  });

  test.each([
    [[0, 2, 3, 4, 5, 6]],
    [[1, 2, 3, 4, 5, 46]],
    ["a", 1, 2, 3, 4, 5],
  ])("입력받은 배열이 범위를 벗어나면 에러를 출력한다.", (input) => {
    expect(() => validateLottoNumberRange(input)).toThrow(
      ERROR_MESSAGE.INVALID_LOTTO_NUMBER_RANGE
    );
  });

  test("입력받은 배열의 길이는 6이어야 한다.", () => {});

  test("입력받은 배열은 중복된 숫자를 포함하지 않아야 한다.", () => {});
});
