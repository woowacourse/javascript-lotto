import { readLine } from "../src/step1/Utils.js";
import { pickNumberInRange } from "../src/step1/Utils.js";
import App from "../src/step1/App.js";

jest.mock("../src/step1/Utils.js", () => ({
  readLine: jest.fn(),
  read: { close: jest.fn() },
  pickNumberInRange: jest.fn(),
}));

const logSpy = jest.spyOn(console, "log");

const runException = async (inputs) => {
  inputs.forEach((input) => {
    readLine.mockImplementationOnce(() => {
      return input;
    });
  });

  const app = new App();
  await app.run();

  expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("[ERROR]"));
};

describe("구입 금액 입력예외 테스트", () => {
  beforeEach(() => {
    pickNumberInRange.mockReturnValue([1, 2, 3, 4, 5, 6]);
  });

  test("1000원 단위가 아닌 입력예외 테스트", async () => {
    runException(["600", "1000", "1,2,3,4,5,6", "10", "n"]);
  });

  test.each([["ㅁ"], ["1.5"], ["NaN"]])(
    "정수가 아닌 입력 예외 테스트 - %s",
    async (input) => {
      runException([input, "1000", "1,2,3,4,5,6", "10", "n"]);
    },
  );
});

describe("당첨 번호 입력 예외 테스트", () => {
  test("1 ~ 45가 아닌 입력 예외 테스트", async () => {
    runException(["1000", "1,2,3,5,6,46", "1,2,3,4,5,6", "10", "n"]);
  });

  test("겹치는 당첨 번호 입력 예외 테스트", async () => {
    runException(["1000", "1,1,2,3,4,5", "1,2,3,4,5,6", "10", "n"]);
  });

  test("정수가 아닌 당첨 번호 입력 예외 테스트", async () => {
    runException(["1000", "a,1,2,3,4,5", "1,2,3,4,5,6", "10", "n"]);
  });
});

describe("보너스 번호 입력 예외 테스트", () => {
  test("1 ~ 45가 아닌 보너스 번호 입력 예외 테스트", async () => {
    runException(["1000", "1,2,3,4,5,6", "46", "10", "n"]);
  });

  test("당첨 번호와 동일한 입력 예외 테스트", async () => {
    runException(["1000", "1,2,3,4,5,6", "3", "41", "n"]);
  });

  test("정수가 아닌 보너스 번호 입력 예외 테스트", async () => {
    runException(["1000", "a,1,2,3,4,5", "1,2,3,4,5,6", "z", "21", "n"]);
  });
});

describe("재시작 입력 예외 테스트", () => {
  test("y 또는 n외 입력 테스트", async () => {
    runException(["1000", "1,2,3,4,5,6", "7", "zzz", "n"]);
  });
});
