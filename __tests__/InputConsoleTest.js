import InputConsole from "../src/Console/InputConsole.js";
import { MissionUtils } from "@woowacourse/mission-utils";

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();

    return Promise.resolve(input);
  });
};

describe("InputConsole 검증 테스트", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test.each([
    { input: "1000", expected: "1000" },
    { input: "7500", expected: "7500" },
  ])("구입 금액 입력값을 그대로 반환한다", async ({ input, expected }) => {
    mockQuestions([input]);
    await expect(InputConsole.readPurchasePrice()).resolves.toBe(expected);
  });

  test.each([
    { input: "1,2,3,4,5,6", expected: "1,2,3,4,5,6" },
    { input: "1,2,3,4,5,6", expected: "1,2,3,4,5,6" },
  ])("당첨 번호 입력값을 그대로 반환한다", async ({ input, expected }) => {
    mockQuestions([input]);
    await expect(InputConsole.readWinningNumbers()).resolves.toEqual(expected);
  });

  test.each([
    { input: "1", expected: "1" },
    { input: "45", expected: "45" },
  ])("보너스 번호 입력값을 그대로 반환한다", async ({ input, expected }) => {
    mockQuestions([input]);
    await expect(InputConsole.readBonusNumber()).resolves.toEqual(expected);
  });

  test.each([
    { input: "y", expected: "y" },
    { input: "n", expected: "n" },
  ])("재시작 입력값을 그대로 반환한다", async ({ input, expected }) => {
    mockQuestions([input]);
    await expect(InputConsole.readRestart()).resolves.toEqual(expected);
  });
});
