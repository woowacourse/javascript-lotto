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
    { input: "500", expected: "500" },
    { input: "7500", expected: "7500" },
  ])("로또 구입 금액 테스트", async ({ input, expected }) => {
    mockQuestions([input]);
    await expect(InputConsole.readPurchasePrice()).resolves.toBe(expected);
  });
});
