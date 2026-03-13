import WebOutput from "../src/view/WebOutput.js";
import ConsoleOutput from "../src/view/ConsoleOutput.js";
beforeEach(() => {
  document.body.innerHTML = `
    <div id="app">
      <header class="header">
        <div class="header__wrap">
        </div>
      </header>
      <div class="main">
        <div class="main__container">
          <header class="main__container__header">
          </header>
          <div class="main__container__body">
          </div>
          <footer class="main__container__footer">
          </footer>
        </div>
      </div>
      <footer class="footer">
      </footer>
      <div class="overlay hidden">
        <div class="modal">
          <header class="modal__header"></header>
          <div class="modal__body"></div>
          <footer class="modal__footer"></footer>
        </div>
      </div>
    </div>
  `;
});


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
