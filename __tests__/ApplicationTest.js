import * as Console from "../src/input";
import * as randomModule from "../src/generateRandomNumbers";

jest.mock("../src/input.js", () => ({
  input: jest.fn(),
  close: jest.fn(),
}));

jest.mock("../src/generateRandomNumbers.js", () => ({
  generateRandomNumbers: jest.fn(),
}));

describe("로또 통합 테스트", () => {
  let logSpy;

  beforeEach(() => {
    logSpy = jest.spyOn(console, "log").mockClear();
  });

  afterEach(() => {
    logSpy.mockRestore();
    jest.clearAllMocks();
  });

  test("8개 구매 3개 일치", async () => {
    randomModule.generateRandomNumbers.mockReturnValue([1, 2, 3, 4, 5, 6]);
    Console.input
      .mockResolvedValueOnce("8000")
      .mockResolvedValueOnce("1,2,3,4,5,6")
      .mockResolvedValueOnce("7")
      .mockResolvedValueOnce("n");

    await gameManger();

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
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log))
    );
  });

  test("1000원 구매, 전부 낙첨", async () => {
    randomModule.generateRandomNumbers.mockReturnValue([7, 8, 9, 10, 11, 12]);
    Console.input
      .mockResolvedValueOnce("1000")
      .mockResolvedValueOnce("1,2,3,4,5,6")
      .mockResolvedValueOnce("7")
      .mockResolvedValueOnce("n");

    await gameManager();

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining("총 수익률은 0%입니다.")
    );
  });
});
