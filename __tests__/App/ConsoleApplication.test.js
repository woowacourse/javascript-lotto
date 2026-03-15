import Console from "../../src/utils/Console.js";
import Random from "../../src/utils/Random.js";

import App from "../../src/App/ConsoleApp.js";

const mockRandoms = (numbers) => {
  Random.randomArray = jest.fn();
  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, Random.randomArray);
};

export const mockQuestions = (inputs) => {
  Console.readLineAsync = jest.fn();
  Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};
const getLogSpy = () => {
  const logSpy = jest.spyOn(Console, "print");
  logSpy.mockClear();
  return logSpy;
};

describe("로또 앱 테스트", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test("로또 리스트 객체는 로또 개수를 받아 그 개수만큼 로또 배열을 가진다.", async () => {
    mockQuestions(["8000", "1,2,3,4,5,6", "7"]);
    mockRandoms([
      [8, 21, 23, 41, 42, 43],
      [3, 5, 11, 16, 32, 38],
      [7, 11, 16, 35, 36, 44],
      [1, 8, 11, 31, 41, 42],
      [13, 14, 16, 38, 42, 45],
      [7, 11, 30, 40, 42, 43],
      [2, 13, 22, 32, 38, 45],
      [1, 3, 5, 14, 22, 45],
    ]);

    const logSpy = getLogSpy();

    const app = new App();
    await app.run();

    const logs = [
      "8개를 구매했습니다.",
      "[8, 21, 23, 41, 42, 43]",
      "[3, 5, 11, 16, 32, 38]",
      "[7, 11, 16, 35, 36, 44]",
      "[1, 8, 11, 31, 41, 42]",
      "[13, 14, 16, 38, 42, 45]",
      "[7, 11, 30, 40, 42, 43]",
      "[2, 13, 22, 32, 38, 45]",
      "[1, 3, 5, 14, 22, 45]",
      "3개 일치 (5,000원) - 1개",
      "4개 일치 (50,000원) - 0개",
      "5개 일치 (1,500,000원) - 0개",
      "5개 일치, 보너스 볼 일치 (30,000,000원) - 0개",
      "6개 일치 (2,000,000,000원) - 0개",
      "총 수익률은 62.5%입니다.",
    ];

    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });

  // test("금액 입력 오류시 다시 금액을 받는다", async () => {
  //   mockQuestions(["8500", "8000", "1,2,3,4,5,6", "7", "n"]);

  //   const app = new App();
  //   await app.run();

  //   const logs = ["1000단위가 아닙니다"];

  //   const logSpy = getLogSpy();

  //   logs.forEach((log) => {
  //     expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
  //   });
  // });
});
