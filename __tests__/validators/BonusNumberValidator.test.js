import { validateType } from "../../src/validators/validate";

describe("보너스 번호 검증 테스트", () => {
  describe("예외 케이스", () => {
    test.each(["^", NaN, undefined, {}])(
      "보너스 번호는 숫자가 아니면 에러가 발생한다. (입력 값 : %p)",
      (bonusNumber) => {
        expect(() => validateType("보너스 번호", bonusNumber)).toThrow(
          "보너스 번호은(는) 숫자여야 합니다."
        );
      }
    );
  });
});
