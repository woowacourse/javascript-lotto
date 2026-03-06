import Lotto from "../src/Lotto";
import {
  printProfitRate,
  printPurchaseCount,
  printPurchasedLottoNumbers,
  printWinStatistics,
} from "../src/view/outputView";

const getLogSpy = () => {
  const logSpy = jest.spyOn(console, "log");
  logSpy.mockClear();
  return logSpy;
};

describe("출력 처리 테스트", () => {
  beforeEach(() => {
    logSpy = jest.spyOn(console, "log").mockClear();
  });

  test("구입 금액에 따른 로또 개수", () => {
    const logSpy = getLogSpy();

    printPurchaseCount(2);

    const log = "2개를 구매했습니다.";

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
  });

  test("구매한 로또 개수에 따른 로또 번호 출력", () => {
    const logSpy = getLogSpy();

    printPurchasedLottoNumbers([
      new Lotto([8, 21, 23, 41, 42, 43]),
      new Lotto([3, 5, 11, 16, 32, 38]),
    ]);

    const logs = ["[8, 21, 23, 41, 42, 43]", "[3, 5, 11, 16, 32, 38]"];

    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });

  test("구매한 로또 개수에 따른 로또 번호 출력(예외 케이스)", () => {
    expect(() =>
      printPurchasedLottoNumbers(
        new Lotto([8, 21, 23, 41, 42, 43]),
        new Lotto([3, 5, 11, 16, 32, 38])
      )
    ).toThrow("[ERROR]");
  });

  test("구매한 로또 개수에 따른 로또 번호 출력(예외 케이스)", () => {
    expect(() => printPurchasedLottoNumbers(3, 5, 11, 16, 32, 38)).toThrow(
      "[ERROR]"
    );
  });

  test("당첨 통계 출력", () => {
    const logSpy = getLogSpy();

    printWinStatistics([0, 0, 0, 0, 0, 1]);

    const logs = [
      "당첨 통계",
      "--------------------",
      "3개 일치 (5,000원) - 1개",
      "4개 일치 (50,000원) - 0개",
      "5개 일치 (1,500,000원) - 0개",
      "5개 일치, 보너스 볼 일치 (30,000,000원) - 0개",
      "6개 일치 (2,000,000,000원) - 0개",
    ];

    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });

  test("당첨 통계 출력(예외 케이스)", () => {
    expect(() => printWinStatistics(0, 0, 0, 0, 0, 1)).toThrow("[ERROR]");
  });

  test("수익률 출력", () => {
    const logSpy = getLogSpy();

    printProfitRate(62.5);

    const log = "총 수익률은 62.5%입니다.";

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
  });

  afterEach(() => {
    const logSpy = getLogSpy();
    logSpy.mockRestore();
  });
});
