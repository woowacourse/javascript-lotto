import * as Console from "../src/view/input";
import * as randomModule from "../src/generateRandomNumbers";
import { playLottoGame } from "../src/playLottoGame";

jest.mock("../src/view/input.js", () => ({
  input: jest.fn(),
  close: jest.fn(),
}));

jest.mock("../src/generateRandomNumbers.js", () => ({
  generateRandomNumbers: jest.fn(),
}));

describe("로또 통합 테스트", () => {
  let logSpy;

  beforeEach(() => {
    logSpy = jest.spyOn(console, "log");
  });

  afterEach(() => {
    logSpy.mockRestore();
    jest.clearAllMocks();
  });

  test("8개 구매 3개 일치", async () => {
    randomModule.generateRandomNumbers
      .mockReturnValueOnce([8, 21, 23, 41, 42, 43])
      .mockReturnValueOnce([3, 5, 11, 16, 32, 38])
      .mockReturnValueOnce([7, 11, 16, 35, 36, 44])
      .mockReturnValueOnce([1, 8, 11, 31, 41, 42])
      .mockReturnValueOnce([13, 14, 16, 38, 42, 45])
      .mockReturnValueOnce([7, 11, 30, 40, 42, 43])
      .mockReturnValueOnce([2, 13, 22, 32, 38, 45])
      .mockReturnValueOnce([1, 3, 5, 14, 22, 45]);
    Console.input
      .mockResolvedValueOnce("8000")
      .mockResolvedValueOnce("1,2,3,4,5,6")
      .mockResolvedValueOnce("7")
      .mockResolvedValueOnce("n");

    await playLottoGame();

    const logs = [
      "8개를 구매했습니다.",
      "당첨 통계",
      "--------------------",
      "3개 일치 (5,000원) - 1개",
      "4개 일치 (50,000원) - 0개",
      "5개 일치 (1,500,000원) - 0개",
      "5개 일치, 보너스 볼 일치 (30,000,000원) - 0개",
      "6개 일치 (2,000,000,000원) - 0개",
      "총 수익률은 62.5%입니다.",
    ];
    logs.forEach((log) =>
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log)),
    );
  });

  test("1000원 구매, 전부 낙첨", async () => {
    randomModule.generateRandomNumbers.mockReturnValue([7, 8, 9, 10, 11, 12]);
    Console.input
      .mockResolvedValueOnce("1000")
      .mockResolvedValueOnce("1,2,3,4,5,6")
      .mockResolvedValueOnce("7")
      .mockResolvedValueOnce("n");

    await playLottoGame();

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining("총 수익률은 0%입니다."),
    );
  });

  test("재시작 후 종료", async () => {
    randomModule.generateRandomNumbers
      .mockReturnValueOnce([7, 8, 9, 10, 11, 12])
      .mockReturnValueOnce([1, 2, 3, 7, 8, 9]);

    Console.input
      .mockResolvedValueOnce("1000")
      .mockResolvedValueOnce("1,2,3,4,5,6")
      .mockResolvedValueOnce("7")
      .mockResolvedValueOnce("y")
      .mockResolvedValueOnce("1000")
      .mockResolvedValueOnce("1,2,3,4,5,6")
      .mockResolvedValueOnce("7")
      .mockResolvedValueOnce("n");

    await playLottoGame();

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining("총 수익률은 0%입니다."),
    );

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining("총 수익률은 500%입니다."),
    );
  });
});
