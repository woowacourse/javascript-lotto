// jest.mock("../src/input.js");

describe("입력 처리 테스트", () => {
  test("구입 금액 입력 테스트", () => {
    Console.input.mockResolvedValue("");
    expect(inputPurchaseAmount().toThrow("[ERROR]"));
  });
  test("구입 금액 입력 테스트", () => {
    Console.input.mockResolvedValue("8000");
    expect(inputPurchaseAmount()).toBe("8000");
  });
  test("당첨 번호 입력 테스트", () => {
    Console.input.mockResolvedValue("1,2,3,4,5,6");
    expect(inputWinningNumbers()).toBe("1,2,3,4,5,6");
  });
  test("당첨 번호 입력 테스트", () => {
    Console.input.mockResolvedValue("");
    expect(inputWinningNumbers().toThrow("[ERROR]"));
  });
  test("보너스 번호 입력 테스트", () => {
    Console.input.mockResolvedValue("7");
    expect(inputBonusNumber()).toBe("7");
  });
  test("보너스 번호 입력 테스트", () => {
    Console.input.mockResolvedValue("");
    expect(inputBonusNumber().toThrow("[ERROR]"));
  });
  test("재시작/종료 입력 테스트", () => {
    Console.input.mockResolvedValue("y");
    expect(inputYesNo()).toBe("y");
  });
});
