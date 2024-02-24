import COMMANDS from "../../src/constants/commands.js";
import ERROR_MESSAGE from "../../src/error/errorMessage.js";
import Command from "../../src/utils/Command.js";

describe("커맨드 확인 함수 테스트", () => {
  test(`${Object.entries(COMMANDS).map(([_, val]) => val)}와(과) 다른 값이 들어오면 오류 반환`, () => {
    const wrongCommand = "w";
    expect(() => Command.isExit(wrongCommand)).toThrow(ERROR_MESSAGE.commandNotInList);
  });

  test(`입력이 ${COMMANDS.false}이면 참 반환`, () => {
    expect(Command.isExit(COMMANDS.false)).toBe(true);
  });

  test(`입력이 ${COMMANDS.true}이면 거짓 반환`, () => {
    expect(Command.isExit(COMMANDS.true)).toBe(false);
  });
});
