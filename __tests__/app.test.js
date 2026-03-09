import App from "../src/step1/app.js";
import MockInput from "./utils/MockInput.js";
import LottoStore from "../src/step1/model/LottoStore.js";
import MockRandomUtil from "./utils/MockRandomUtil.js";
import { ERROR_MESSAGE } from "../src/step1/constant/message.js";

describe("App 통합 테스트", () => {
  test("잘못된 Input 인스턴스를 주입하면 예외가 발생한다.", () => {
    expect(() => {
      new App({
        input: {}
      });
    }).toThrow(ERROR_MESSAGE.INVALID_INPUT);
  });

  test("정상적인 사용자 입력이 들어오는 경우 예외 없이 종료된다.", async () => {
    const app = new App({
      input: new MockInput(["1000", "1,2,3,4,5,6", "7", "n"]),
    });

    await expect(app.run()).resolves.toBeUndefined();
  });

  test("2000원으로 2장 구매 시 1등 당첨 결과 출력을 확인한다.", async () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    const app = new App({
      input: new MockInput(["2000", "1,2,3,4,5,6", "7", "n"]),
      lottoStore: new LottoStore({
        randomUtil: new MockRandomUtil([
          [1, 2, 3, 4, 5, 6],
          [1, 2, 3, 4, 5, 6],
        ]),
      }),
    });

    const expectedLogs = [
      "2장을 구매했습니다.",
      "[1, 2, 3, 4, 5, 6]",
      "[1, 2, 3, 4, 5, 6]",
      "당첨 통계",
      "3개 일치 (5,000원) - 0개",
      "4개 일치 (50,000원) - 0개",
      "5개 일치 (1,500,000원) - 0개",
      "5개 일치, 보너스 볼 일치 (30,000,000원) - 0개",
      "6개 일치 (2,000,000,000원) - 2개",
      "총 수익률은 200000000.0%입니다.",
    ];

    await app.run();

    expectedLogs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });

    logSpy.mockRestore();
  });

  test("당첨 통계를 출력한 뒤 재시작을 선택할 경우 다시 시작된다.", async () => {
    const app = new App({
      input: new MockInput([
        "1000",
        "1,2,3,4,5,6",
        "7",
        "y",
        // 다시 시작
        "1000",
        "1,2,3,4,5,6",
        "7",
        "n",
      ]),
    });

    await expect(app.run()).resolves.toBeUndefined();
  });

  test("재시도 여부 입력이 y 또는 n이 아닌 경우 에러 메시지를 출력한다", async () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    const app = new App({
      input: new MockInput(["1000", "1,2,3,4,5,6", "7", "s", "n"]),
    });

    await app.run();

    expect(logSpy).toHaveBeenCalledWith(ERROR_MESSAGE.NOT_INPUT_RETRY);

    logSpy.mockRestore();
  });
});
