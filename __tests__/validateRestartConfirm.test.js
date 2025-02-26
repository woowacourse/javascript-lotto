import { CONFIRMATION } from "../src/constants/validateConstants.js";
import { RESTART_ERROR_MESSAGE } from "../src/constants/errorConstants.js";
import validateRestartConfirm from "../src/validations/validateRestartConfirm.js";

describe("재실행 입력에 대한 유효성 테스트", () => {
  test.each([
    {
      description: `${CONFIRMATION.UPPER_YES}, ${CONFIRMATION.YES}, ${CONFIRMATION.UPPER_NO}, ${CONFIRMATION.NO} 중 하나의 문자가 아닌 경우`,
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
  ])("$description 에러가 발생한다.", ({ input }) => {
    expect(() => {
      validateRestartConfirm(input);
    }).toThrow(RESTART_ERROR_MESSAGE);
  });

  test.each([
    {
      description: `${CONFIRMATION.YES}와 ${CONFIRMATION.NO}이 함께 들어온 경우`,
      input: `${CONFIRMATION.YES}${CONFIRMATION.NO}`,
    },
    {
      description: "중복으로 잘못 입력한 경우",
      input: `${CONFIRMATION.UPPER_YES}${CONFIRMATION.UPPER_YES}`,
    },
  ])("$description 에러가 발생한다.", ({ input }) => {
    expect(() => {
      validateRestartConfirm(input);
    }).toThrow(RESTART_ERROR_MESSAGE);
  });

  test.each([
    { input: CONFIRMATION.UPPER_YES },
    { input: CONFIRMATION.YES },
    { input: CONFIRMATION.UPPER_NO },
    { input: CONFIRMATION.NO },
  ])("$input 중 하나인 경우 정상적으로 동작한다.", ({ input }) => {
    expect(() => {
      validateRestartConfirm(input);
    }).not.toThrow();
  });
});
