import { validationRestartInput } from "./validationRestartInput.js";

describe("validationRestartInput 유효성 검사", () => {
  test("재시작 입력에 Y또는 N이 아니면 에러가 발생한다.", () => {
    expect(() => validationRestartInput("A")).toThrow();
  });
});
