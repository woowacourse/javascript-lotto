import WebOutput from "../src/view/WebOutput.js";
import ConsoleOutput from "../src/view/ConsoleOutput.js";

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
  })
});
