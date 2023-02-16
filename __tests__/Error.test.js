import App from "../src/App.js";

describe("Error처리 테스트", () => {
  test("구입금액이 숫자가 아닐 경우 Error처리 테스트", () => {
    const buyMoney = "aiden";
    const app = new App();
    expect(() => {
      app.validateBuyMoney(buyMoney);
    }).toThrowError("숫자만 입력할 수 있습니다.");
  });

  test("구입금액이 1000원 단위가 아닐 경우 Error처리 테스트", () => {
    const buyMoney = 200;
    const app = new App();
    expect(() => {
      app.validateBuyMoney(buyMoney);
    }).toThrowError("1000원 단위로 입력해주세요.");
  });

  test("구입금액이 1000원 단위가 아닐 경우 Error처리 테스트", () => {
    const buyMoney = -2000;
    const app = new App();
    expect(() => {
      app.validateBuyMoney(buyMoney);
    }).toThrowError("구매 금액은 양의 정수여야 합니다.");
  });
});
