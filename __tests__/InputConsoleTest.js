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
  ])("로또 구입 금액 테스트", async ({ input, expected }) => {
    mockQuestions([input]);
    await expect(InputConsole.readPurchasePrice()).resolves.toBe(expected);
  });

  test.each([
    { input: "1,2,3,4,5,6", expected: "1,2,3,4,5,6" },
    { input: "1,2,3,4,5,6", expected: "1,2,3,4,5,6" },
  ])("당첨 번호 입력 테스트: $input", async ({ input, expected }) => {
    mockQuestions([input]);
    await expect(InputConsole.readWinningNumbers()).resolves.toEqual(expected);
  });

  test.each([
    { input: "1", winningNumbers: [2, 3, 4, 5, 6, 7], expected: "1" },
    { input: "45", winningNumbers: [1, 2, 3, 4, 5, 6], expected: "45" },
  ])(
    "보너스 번호 입력 테스트: $input",
    async ({ input, winningNumbers, expected }) => {
      mockQuestions([input]);
      await expect(
        InputConsole.readBonusNumber(winningNumbers),
      ).resolves.toEqual(expected);
    },
  );

  test.each([
    { input: "y", expected: "y" },
    { input: "n", expected: "n" },
  ])("재시작 입력 테스트: $input", async ({ input, expected }) => {
    mockQuestions([input]);
    await expect(InputConsole.readRestart()).resolves.toEqual(expected);
  });
});
