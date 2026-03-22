import fs from "fs";
import path from "path";
import WebInput from "../src/view/WebInput.js";
import ConsoleInput from "../src/view/ConsoleInput.js";
import MockInput from "./mocks/MockInput.js";

const html = fs.readFileSync(
  path.resolve(__dirname, "./../index.html"),
  "utf8",
);

const tempEl = document.createElement("div");
tempEl.innerHTML = html.toString();

beforeEach(() => {
  document.body.innerHTML = tempEl.outerHTML;
});

describe("Input 테스트", () => {
  test("WebInput, ConsoleInput, MockInput은 모두 공통된 인스턴스 메서드를 가진다.", () => {
    const webInput = new WebInput();
    const consoleInput = new ConsoleInput();
    const mockInput = new MockInput();

    expect(typeof webInput.readMoneyAsync).toBe("function");
    expect(typeof consoleInput.readMoneyAsync).toBe("function");
    expect(typeof mockInput.readMoneyAsync).toBe("function");

    expect(typeof webInput.readWinningNumberAndBonusAsync).toBe("function");
    expect(typeof consoleInput.readWinningNumberAndBonusAsync).toBe("function");
    expect(typeof mockInput.readWinningNumberAndBonusAsync).toBe("function");

    expect(typeof webInput.readRetryAsync).toBe("function");
    expect(typeof consoleInput.readRetryAsync).toBe("function");
    expect(typeof mockInput.readRetryAsync).toBe("function");
  });

  test("WebInput, ConsoleInput, MockInput의 readMoneyAsync 메서드는 모두 동일하게 호출되며 동일한 결과를 반환한다.", async () => {
    const testInputs = ["1000"];

    const webInput = new WebInput();
    const webResultPromise = webInput.readMoneyAsync();
    await new Promise((resolve) => setTimeout(resolve, 0));
    document.querySelector(".money__input").value = testInputs[0];
    document.querySelector(".money__submit").click();
    const webResult = await webResultPromise;
    expect(webResult).toBe(testInputs[0]);

    const consoleInput = new ConsoleInput();
    process.stdin.push(testInputs[0] + "\n");
    const consoleResult = await consoleInput.readMoneyAsync();
    expect(consoleResult).toBe(testInputs[0]);

    const mockInput = new MockInput(testInputs);
    const mockResult = await mockInput.readMoneyAsync();
    expect(mockResult).toBe(testInputs[0]);
  });

  test("WebInput, ConsoleInput, MockInput의 readWinningNumberAndBonusAsync 메서드는 모두 동일하게 호출되며 동일한 결과를 반환한다.", async () => {
    const winningNumbersString = "1,2,3,4,5,6";
    const winningNumbers = winningNumbersString.split(",");
    const bonusNumberString = "7";

    const webInput = new WebInput();
    const webResultPromise = webInput.readWinningNumberAndBonusAsync();
    await new Promise((resolve) => setTimeout(resolve, 0));
    document.querySelector(".winning-number__first__input").value =
      winningNumbers[0];
    document.querySelector(".winning-number__second__input").value =
      winningNumbers[1];
    document.querySelector(".winning-number__third__input").value =
      winningNumbers[2];
    document.querySelector(".winning-number__fourth__input").value =
      winningNumbers[3];
    document.querySelector(".winning-number__fifth__input").value =
      winningNumbers[4];
    document.querySelector(".winning-number__sixth__input").value =
      winningNumbers[5];
    document.querySelector(".bonus-number__input").value = bonusNumberString;
    document.querySelector(".show-result__button").click();
    const webResult = await webResultPromise;
    expect(webResult).toEqual({
      winningNumbersInput: winningNumbersString,
      bonusNumberInput: bonusNumberString,
    });

    const consoleInput = new ConsoleInput();
    process.stdin.push(winningNumbersString + "\n");
    process.stdin.push(bonusNumberString + "\n");
    const consoleResult = await consoleInput.readWinningNumberAndBonusAsync();
    expect(consoleResult).toEqual({
      winningNumbersInput: winningNumbersString,
      bonusNumberInput: bonusNumberString,
    });

    const mockInput = new MockInput(["1,2,3,4,5,6", "7"]);
    const mockResult = await mockInput.readWinningNumberAndBonusAsync();
    expect(mockResult).toEqual({
      winningNumbersInput: winningNumbersString,
      bonusNumberInput: bonusNumberString,
    });
  });

  test("WebInput, ConsoleInput, MockInput의 readRetryAsync 메서드는 모두 동일하게 호출되며 동일한 결과를 반환한다.", async () => {
    const testInput = "y";

    const webInput = new WebInput();
    const webResultPromise = webInput.readRetryAsync();
    await new Promise((resolve) => setTimeout(resolve, 0));
    document.querySelector(".retry__button").click();
    const webResult = await webResultPromise;
    expect(webResult).toBe(testInput);

    const consoleInput = new ConsoleInput();
    process.stdin.push(testInput + "\n");
    const consoleResult = await consoleInput.readRetryAsync();
    expect(consoleResult).toBe(testInput);

    const mockInput = new MockInput([testInput]);
    const mockResult = await mockInput.readRetryAsync();
    expect(mockResult).toBe(testInput);
  });
});
