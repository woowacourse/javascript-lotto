import { validateRange, validateType } from "../../src/validators/validate";

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

    test.each([-Infinity, 0, 46, Infinity])(
      "보너스 번호의 범위가 1~45 사이가 아니면 에러가 발생한다. (입력 값 : %p)",
      (bonusNumber) => {
        expect(() =>
          validateRange({
            key: "보너스 번호",
            value: bonusNumber,
            min: 1,
            max: 45,
          })
        ).toThrow("보너스 번호은(는) 1 이상 45 이하여야 합니다.");
      }
    );

    test("보너스 번호가 당첨 번호와 중복되면 에러가 발생한다.", () => {
      const bonusNumber = 1;
      const winningNumbers = [1, 2, 3, 4, 5, 6];

      expect(() => validateDuplicate(bonusNumber, winningNumbers)).toThrow(
        "보너스 번호는 당첨 번호와 중복될 수 없습니다."
      );
    });
  });
});
