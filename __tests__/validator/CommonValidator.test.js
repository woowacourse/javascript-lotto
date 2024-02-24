import SYMBOL from "../../src/constants/symbol";
import commonValidator from "../../src/validator/CommonValidator";

describe("commonValidator 객체 테스트", () => {
  test.each(["", [1, 2, 3, 4, 5, ""]])(
    "빈 값을 입력 받거나 배열에 빈 값이 있으면 오류를 던진다.",
    (input) => {
      expect(() => commonValidator.validateEmpty(input)).toThrow();
    },
  );

  test("입력받은 값에 공백이 있으면 오류를 던진다.", () => {
    const includesSpaceInput = SYMBOL.SPACE + "1";

    expect(() =>
      commonValidator.validateExistSpace(includesSpaceInput),
    ).toThrow();
  });
});
