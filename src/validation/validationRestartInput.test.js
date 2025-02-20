import validationRestartInput from "./validationRestartInput.js";
import CustomError from "../CustomError.js";
import { ERROR_MESSAGE } from "../constants/message.js";

describe("validationRestartInput 유효성 검사", () => {
  test("재시작 입력에 y또는 n이 아니면 에러가 발생한다.", () => {
    expect(() => validationRestartInput("a")).toThrow(
      new CustomError(ERROR_MESSAGE.INVALID_RESTART)
    );
  });

  test("재시작 입력이 y 또는 n이면 에러가 발생하지 않는다.", () => {
    expect(() => validationRestartInput("y")).not.toThrow();
    expect(() => validationRestartInput("n")).not.toThrow();
  });
});
