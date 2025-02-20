import {
  RESTART_ERROR_MESSAGE,
  YES,
  NO,
  UPPER_YES,
  UPPER_NO,
} from "../src/constants/constants.js";
import validateRestartConfirm from "../src/validations/validateRestartConfirm.js";

describe("재실행 입력에 대한 유효성 테스트", () => {
  test.each([
    {
      description: `${UPPER_YES}, ${YES}, ${UPPER_NO}, ${NO} 중 하나의 문자가 아닌 경우`,
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
      description: `${YES}와 ${NO}이 함께 들어온 경우`,
      input: `${YES}${NO}`,
    },
    {
      description: "중복으로 잘못 입력한 경우",
      input: `${UPPER_YES}${UPPER_YES}`,
    },
  ])("$description 에러가 발생한다.", ({ input }) => {
    // given
    // when & then
    expect(() => {
      validateRestartConfirm(input);
    }).toThrow(RESTART_ERROR_MESSAGE);
  });

  test.each([[UPPER_YES, YES, UPPER_NO, NO]])(
    `${UPPER_YES}, ${YES}, ${UPPER_NO}, ${NO} 중 하나인 경우 정상적으로 동작한다.`,
    (input) => {
      // given
      // when & then
      expect(() => {
        validateRestartConfirm(input);
      }).not.toThrow();
    },
  );
});
