import fs from "fs";
import path from "path";
import WebOutput from "../src/view/WebOutput.js";
import ConsoleOutput from "../src/view/ConsoleOutput.js";
import Lotto from "../src/model/Lotto.js";

const html = fs.readFileSync(
  path.resolve(__dirname, "./../index.html"),
  "utf8",
);
const tempEl = document.createElement("div");
tempEl.innerHTML = html.toString();

beforeEach(() => {
  document.body.innerHTML = tempEl.outerHTML;
});

afterEach(() => {
  jest.clearAllMocks();
})

describe("Output 테스트", () => {
  test("WebOutput, ConsoleOutput은 모두 공통된 인스턴스 메서드를 가진다.", () => {
    const webOutput = new WebOutput();
    const consoleOutput = new ConsoleOutput();

    expect(typeof webOutput.printError).toBe("function");
    expect(typeof consoleOutput.printError).toBe("function");

    expect(typeof webOutput.printResult).toBe("function");
    expect(typeof consoleOutput.printResult).toBe("function");

    expect(typeof webOutput.printPurchasedLottos).toBe("function");
    expect(typeof consoleOutput.printPurchasedLottos).toBe("function");
  });

  test("WebOutput, ConsoleOutput의 printError 메서드는 모두 동일하게 호출되며 동일한 결과를 반환한다.", () => {
    const errorMessage = "테스트 에러 메시지";
    
    const webOutput = new WebOutput();
    const consoleOutput = new ConsoleOutput();

    const consoleSpy = jest.spyOn(console, 'log');

    consoleOutput.printError(errorMessage);

    expect(consoleSpy).toHaveBeenCalledWith(errorMessage);

    const alertSpy = jest.spyOn(window, 'alert');

    webOutput.printError(errorMessage);

    expect(alertSpy).toHaveBeenCalledWith(errorMessage);
  });

  test("WebOutput, ConsoleOutput의 printPurchasedLottos 메서드는 모두 동일하게 호출되며 동일한 결과를 반환한다.", () => {
    const mockLottos = [
      new Lotto([1,2,3,4,5,6]),
      new Lotto([7,8,9,10,11,12]),
      new Lotto([13,14,15,16,17,18])
    ];
    
    const webOutput = new WebOutput();
    const consoleOutput = new ConsoleOutput();

    const consoleSpy = jest.spyOn(console, 'log');

    consoleOutput.printPurchasedLottos(mockLottos);
    
    expect(consoleSpy).toHaveBeenCalledWith("3장을 구매했습니다.");
    expect(consoleSpy).toHaveBeenCalledWith("[1, 2, 3, 4, 5, 6]");
    expect(consoleSpy).toHaveBeenCalledWith("[7, 8, 9, 10, 11, 12]");
    expect(consoleSpy).toHaveBeenCalledWith("[13, 14, 15, 16, 17, 18]");

    webOutput.printPurchasedLottos(mockLottos);
    
    const countParagraph = document.querySelector(".purchased-lottos-count");
    const lottoItems = document.querySelectorAll(".purchased-lotto");

    expect(countParagraph.textContent).toBe("총 3개를 구매하였습니다.");
    expect(lottoItems.length).toBe(3);
  });

  test("WebOutput, ConsoleOutput의 printResult 메서드는 모두 동일하게 호출되며 동일한 결과를 반환한다.", () => {
    const mockCountsObject = {
      FIRST: 1,
      SECOND: 0,
      THIRD: 2,
      FOURTH: 3,
      FIFTH: 10
    };
    const mockReturnOnInvestment = 62.5;
    
    const webOutput = new WebOutput();
    const consoleOutput = new ConsoleOutput();

    const consoleSpy = jest.spyOn(console, 'log');

    consoleOutput.printResult(mockCountsObject, mockReturnOnInvestment);
    
    expect(consoleSpy).toHaveBeenCalledWith("\n당첨 통계");
    expect(consoleSpy).toHaveBeenCalledWith("--------------------");
    expect(consoleSpy).toHaveBeenCalledWith(`총 수익률은 ${mockReturnOnInvestment.toFixed(1)}%입니다.`);

    webOutput.printResult(mockCountsObject, mockReturnOnInvestment);
    
    const returnOnInvestmentElement = document.querySelector(".return-on-investment");
    
    expect(returnOnInvestmentElement.textContent).toBe("당신의 총 수익률은 62.5%입니다.");
  });
});
