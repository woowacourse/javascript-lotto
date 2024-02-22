import Command from "../../src/utils/Command.js";

describe("커맨드 확인 함수 테스트", () => {
  test(`${Command.Commands}와(과) 다른 값이 들어오면 오류 반환`, () => {
    const wrongCommand = "w";
    expect(() => Command.isRestart(wrongCommand)).toThrow("[ERROR]");
  });

  test(`입력이 ${Command.Commands[0]}이면 참 반환`, () => {
    expect(Command.isRestart(Command.Commands[0])).toBe(true);
  });

  test(`입력이 ${Command.Commands[1]}이면 거짓 반환`, () => {
    expect(Command.isRestart(Command.Commands[1])).toBe(false);
  });
});
