import validateRestartInput from "./validateRestartInput.js";
import CustomError from "../CustomError.js";
import { ERROR_MESSAGE, ERROR_PREFIX } from "../constants/message.js";
import { LOTTO_RESTART_COMMAND } from "../constants/lotto.js";

describe("validateRestartInput 유효성 검사", () => {
  test(`재시작 입력에 ${LOTTO_RESTART_COMMAND.restart}또는 ${LOTTO_RESTART_COMMAND.end}이 아니면 에러가 발생한다.`, () => {
    expect(() => validateRestartInput("a")).toThrow(
      new CustomError(ERROR_MESSAGE.INVALID_RESTART, ERROR_PREFIX.invalidInputError)
    );
  });

  test(`재시작 입력이 ${LOTTO_RESTART_COMMAND.restart} 또는 ${LOTTO_RESTART_COMMAND.end}이면 에러가 발생하지 않는다.`, () => {
    expect(() => validateRestartInput(LOTTO_RESTART_COMMAND.restart)).not.toThrow();
    expect(() => validateRestartInput(LOTTO_RESTART_COMMAND.end)).not.toThrow();
  });
});
