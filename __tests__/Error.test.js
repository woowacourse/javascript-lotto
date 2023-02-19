import App from "../src/App.js";

describe("구입금액 Error처리 테스트", () => {
  test.each(["aiden", 200, -2000, 1.2])("구입 금액", (buyMoney) => {
    const app = new App();

    expect(() => {
      app.validateBuyMoney(buyMoney);
    }).toThrow();
  });
});

describe("당첨로또 Error처리 테스트", () => {
  test.each(["a", 47, -124, 44.5])("당첨로또 Error처리", (eachNumber) => {
    const app = new App();

    expect(() => {
      app.validateBuyMoney(eachNumber);
    }).toThrow();
  });
});

describe("재시작 여부 입력 Error처리 테스트", () => {
  test("재시작 여부 입력이 정해진 형식이 아닐 경우 Error처리 테스트", () => {
    const retryInput = "a";
    const app = new App();

    expect(() => {
      app.validateRetryInput(retryInput);
    }).toThrow();
  });
});
