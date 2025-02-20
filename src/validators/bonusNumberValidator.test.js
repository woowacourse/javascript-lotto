import { MESSAGES } from "../constants/index.js";
import { bonusNumberValidator } from "../validators/index.js";

describe("bonusNumberValidator 테스트", () => {
  test("올바른 보너스 번호면 에러가 발생하지 않는다.", () => {
    expect(() => bonusNumberValidator(7, [1, 2, 3, 4, 5, 6])).not.toThrow();
  });

  test("보너스 번호가 숫자가 아니면 에러를 띄운다.", () => {
    expect(() => bonusNumberValidator("a", [1, 2, 3, 4, 5, 6])).toThrow(
      MESSAGES.invalid.numberFormat
    );
  });

  test("보너스 번호가 1보다 작거나 45보다 크면 에러를 띄운다.", () => {
    expect(() => bonusNumberValidator(0, [1, 2, 3, 4, 5, 6])).toThrow(
      MESSAGES.invalid.bonusNumberRange
    );
    expect(() => bonusNumberValidator(46, [1, 2, 3, 4, 5, 6])).toThrow(
      MESSAGES.invalid.bonusNumberRange
    );
  });

  test("보너스 번호가 당첨 번호와 중복되면 에러를 띄운다.", () => {
    expect(() => bonusNumberValidator(3, [1, 2, 3, 4, 5, 6])).toThrow(
      MESSAGES.invalid.duplicateBonusNumber
    );
  });
});
