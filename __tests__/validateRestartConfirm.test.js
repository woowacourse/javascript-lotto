import { RESTART_ERROR_MESSAGE } from "../src/constants/constants.js";
import validateRestartConfirm from "../src/validations/validateRestartConfirm.js";

describe("재실행 입력에 대한 유효성 테스트", () => {
  test.each([
    {
      description: "Y, y, N, n 중 하나의 문자가 아닌 경우",
      input: "a",
    },
    {
      description: "숫자인 경우",
      input: "1",
    },
    {
      description: "빈 값이 들어온 경우",
      input: "",
    },
    {
      description: "y와 n이 함께 들어온 경우",
      input: "yn",
    },
    {
      description: "중복으로 잘못 입력한 경우",
      input: "YY",
    },
  ])("$description 에러가 발생한다.", ({ input }) => {
    // given
    // when & then
    expect(() => {
      validateRestartConfirm(input);
    }).toThrow(RESTART_ERROR_MESSAGE);
  });

  test.each([["Y", "y", "N", "n"]])(
    "Y, y, N, n 중 하나인 경우 정상적으로 동작한다.",
    (input) => {
      // given
      // when & then
      expect(() => {
        validateRestartConfirm(input);
      }).not.toThrow();
    },
  );
});
