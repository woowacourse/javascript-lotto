import Validator from "../src/validation/validator.js";

describe("입력 값 유효성 테스트를 진행한다.", () => {
  test("입력이 비어있으면 오류를 발생시킨다.", () => {
    // given
    const input = "";
    // when
    // then
    expect(() => Validator.empty(input)).toThrow("[ERROR]");
  });

  test("숫자가 아닌 값을 입력하면 오류를 발생시킨다.", () => {
    // given
    const input = ".";
    // when
    // then
    expect(() => Validator.number(input)).toThrow("[ERROR]");
  });

  test.each([0, 46])(
    "범위를 벗어난 입력을 할 경우 오류를 발생시킨다.",
    (input) => {
      // given
      const min = 1;
      const max = 45;
      // when
      // then
      expect(() => Validator.range({ min, max }, input)).toThrow("[ERROR]");
    }
  );
});
