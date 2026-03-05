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
});
