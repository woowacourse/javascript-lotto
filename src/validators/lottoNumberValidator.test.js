import { MESSAGES } from "../constants/index.js";
import { lottoNumberValidator } from "./lottoNumberValidator.js";

describe("lottoNumberValidator", () => {
  test("올바른 입력이면 에러가 발생하지 않는다.", () => {
    expect(() => lottoNumberValidator([1, 2, 3, 4, 5, 6])).not.toThrow();
  });

  test("당첨 번호에 숫자가 아닌 값이 포함되면 에러를 띄운다.", () => {
    expect(() => lottoNumberValidator([1, 2, 3, 4, 5, "A"])).toThrow(
      MESSAGES.invalid.numberFormat
    );
  });

  test("당첨 번호에 소수점이 있으면 에러를 띄운다.", () => {
    expect(() => lottoNumberValidator([1.1, 2, 3, 4, 5, 6])).toThrow(
      MESSAGES.invalid.decimalNumber
    );
  });

  test("당첨 번호로 입력된 번호가 6개가 아닌 경우 (5개) 에러를 띄운다.", () => {
    expect(() => lottoNumberValidator([1, 2, 3, 4, 5])).toThrow(
      MESSAGES.invalid.lottoNumberCount
    );
  });

  test("당첨 번호로 입력된 번호가 6개가 아닌 경우 (7개) 에러를 띄운다.", () => {
    expect(() => lottoNumberValidator([1, 2, 3, 4, 5, 6, 7])).toThrow(
      MESSAGES.invalid.lottoNumberCount
    );
  });

  test("당첨 번호가 중복된 경우 에러를 띄운다", () => {
    expect(() => lottoNumberValidator([1, 2, 3, 3, 4, 5])).toThrow(
      MESSAGES.invalid.duplicateLottoNumber
    );
  });

  test("당첨 번호가 1보다 작은 경우", () => {
    expect(() => lottoNumberValidator([0, 2, 3, 4, 5, 6])).toThrow(
      MESSAGES.invalid.lottoNumberRange
    );
  });

  test("당첨 번호가 45보다 큰 경우", () => {
    expect(() => lottoNumberValidator([1, 2, 3, 4, 5, 46])).toThrow(
      MESSAGES.invalid.lottoNumberRange
    );
  });
});
