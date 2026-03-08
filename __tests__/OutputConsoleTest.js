import OutputConsole from "../src/Console/OutputConsole.js";
import { MissionUtils } from "@woowacourse/mission-utils";

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
};

describe("OutputConsole 테스트", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test("로또 번호 출력 테스트", () => {
    const logSpy = getLogSpy();

    const lottos = [
      { toString: () => "[1, 2, 3, 4, 5, 6]" },
      { toString: () => "[40, 41, 42, 43, 44, 45]" },
    ];

    OutputConsole.printLottoList(lottos);

    expect(logSpy).toHaveBeenCalledWith("2개를 구매했습니다.");
    expect(logSpy).toHaveBeenCalledWith("[1, 2, 3, 4, 5, 6]");
    expect(logSpy).toHaveBeenCalledWith("[40, 41, 42, 43, 44, 45]");
  });

  test("당첨 내역 출력 테스트", () => {
    const logSpy = getLogSpy();

    const result = { FIRST: 0, SECOND: 0, THIRD: 0, FOURTH: 0, FIFTH: 1 };

    OutputConsole.printMatchResult(result);

    expect(logSpy).toHaveBeenCalledWith("\n당첨 통계");
    expect(logSpy).toHaveBeenCalledWith("--------------------");
    expect(logSpy).toHaveBeenCalledWith("3개 일치 (5,000원) - 1개");
    expect(logSpy).toHaveBeenCalledWith("4개 일치 (50,000원) - 0개");
    expect(logSpy).toHaveBeenCalledWith("5개 일치 (1,500,000원) - 0개");
    expect(logSpy).toHaveBeenCalledWith("5개 일치, 보너스 볼 일치 (30,000,000원) - 0개");
    expect(logSpy).toHaveBeenCalledWith("6개 일치 (2,000,000,000원) - 0개");

    
  })

  test("총 수익률 출력 테스트", () => {
    const logSpy = getLogSpy();

    const totalProfitRate = 0.0;

    OutputConsole.printProfitRate(totalProfitRate);

    expect(logSpy).toHaveBeenCalledWith(`총 수익률은 ${totalProfitRate}%입니다.` )
  })
});
