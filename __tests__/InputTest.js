import * as Console from "../src/view/input.js";
import {
  inputBonusNumber,
  inputPurchaseAmount,
  inputWinningNumbers,
  inputYesNo,
} from "../src/view/inputView";

jest.mock("../src/view/input.js", () => ({
  input: jest.fn(),
  close: jest.fn(),
}));

describe("입력 처리 테스트", () => {
  test("구입 금액 입력 테스트 (빈 문자열 입력 시 -> 에러)", async () => {
    Console.input.mockResolvedValue("");
    await expect(inputPurchaseAmount()).rejects.toThrow("[ERROR]");
  });
  test("구입 금액 입력 테스트 (8000 입력 시 -> 정상)", async () => {
    Console.input.mockResolvedValue("8000");
    expect(await inputPurchaseAmount()).toBe("8000");
  });
  test("당첨 번호 입력 테스트 (1,2,3,4,5,6 입력시 -> 정상)", async () => {
    Console.input.mockResolvedValue("1,2,3,4,5,6");
    expect(await inputWinningNumbers()).toBe("1,2,3,4,5,6");
  });
  test("당첨 번호 입력 테스트 (빈 문자열 입력 시 -> 에러)", async () => {
    Console.input.mockResolvedValue("");
    await expect(inputWinningNumbers()).rejects.toThrow("[ERROR]");
  });
  test("보너스 번호 입력 테스트 (7 입력 시 -> 정상)", async () => {
    Console.input.mockResolvedValue("7");
    expect(await inputBonusNumber()).toBe("7");
  });
  test("보너스 번호 입력 테스트 (빈 문자열 입력 시 -> 에러", async () => {
    Console.input.mockResolvedValue("");
    await expect(inputBonusNumber()).rejects.toThrow("[ERROR]");
  });
  test("재시작/종료 입력 테스트 (y 입력 시 -> 정상)", async () => {
    Console.input.mockResolvedValue("y");
    expect(await inputYesNo()).toBe("y");
  });
});

afterAll(() => {
  Console.close();
});
