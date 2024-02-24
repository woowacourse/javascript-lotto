import Command from "../../src/utils/Command.js";
import { ERROR_MESSAGE } from "../../src/error/ErrorMessage.js";
describe("커맨드 확인 함수 테스트", () => {
  test(`${Command.COMMANDS}와(과) 다른 값이 들어오면 오류 반환`, () => {
    const wrongCommand = "w";
    expect(() => Command.isExit(wrongCommand)).toThrow(ERROR_MESSAGE.commandNotInList);
  });

  test(`입력이 ${Command.COMMANDS[1]}이면 참 반환`, () => {
    expect(Command.isExit(Command.COMMANDS[1])).toBe(true);
  });

  test(`입력이 ${Command.COMMANDS[2]}이면 거짓 반환`, () => {
    expect(Command.isExit(Command.COMMANDS[0])).toBe(false);
  });
});
