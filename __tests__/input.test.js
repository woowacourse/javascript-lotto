import ConsoleInput from "../src/step1/view/ConsoleInput.js";
import MockInput from "./utils/MockInput.js";

describe("Input 테스트", () => {
  test("ConsoleInput과 MockInput은 모두 readLineAsync 인스턴스 메서드를 가진다.", () => {
    const consoleInput = new ConsoleInput();
    const mockInput = new MockInput();

    expect(typeof consoleInput.readLineAsync).toBe("function");
    expect(typeof mockInput.readLineAsync).toBe("function");
  });

  test("ConsoleInput과 MockInput의 readLineAsync 메서드는 모두 동일하게 호출되며 동일한 결과를 반환한다.", async () => {
    const testInputs = ["1000"];

    const mockInput = new MockInput(testInputs);
    const mockResult = await mockInput.readLineAsync();
    expect(mockResult).toBe(testInputs[0]);

    const consoleInput = new ConsoleInput();
    process.stdin.push(testInputs[0] + "\n");
    const consoleResult = await consoleInput.readLineAsync();
    expect(consoleResult).toBe(testInputs[0]);
  });
});
