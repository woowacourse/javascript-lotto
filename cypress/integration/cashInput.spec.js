import { ALERT_MESSAGE, JS_SELECTOR } from "../../src/js/constants/index.js";
import { toDataAttributeSelector as toDAS } from "../../src/js/utils/querySelector.js";

describe("구입 금액 입력 테스트", () => {
  before(() => {
    cy.visit("/");
  });

  beforeEach(() => {
    cy.window().then((win) => cy.stub(win, "alert").as("windowAlert"));
  });

  const testAlertMessage = (wrongUserInput, alertMessage, callCount = 1) => {
    if (wrongUserInput !== "") {
      cy.get(toDAS(JS_SELECTOR.CASH_INPUT.INPUT)).type(wrongUserInput);
    }

    cy.get(toDAS(JS_SELECTOR.CASH_INPUT.BUTTON)).click();

    cy.get("@windowAlert")
      .should("have.callCount", callCount++)
      .its("lastCall")
      .should("be.calledWith", alertMessage);
  };

  it("초기화면에 구입 입력 Form이 보여진다.", () => {
    cy.get(toDAS(JS_SELECTOR.CASH_INPUT.CONTAINER)).should("be.visible");
    cy.get(toDAS(JS_SELECTOR.CASH_INPUT.INPUT)).should("be.visible");
    cy.get(toDAS(JS_SELECTOR.CASH_INPUT.BUTTON)).should("be.visible");
  });

  it("유저가 빈 문자열을 입력한 경우, 에러메시지를 alert로 출력한다", () => {
    const wrongUserInput = "";
    testAlertMessage(wrongUserInput, ALERT_MESSAGE.ERROR.CASH_INPUT.EMPTY);
  });

  it("유저가 숫자로 변환될 수 없는 문자를 입력한 경우, 에러메시지를 alert로 출력한다", () => {
    ["김동희", "+", "abcd", "🎟️"].forEach((wrongUserInput, index) =>
      testAlertMessage(
        wrongUserInput,
        ALERT_MESSAGE.ERROR.CASH_INPUT.NOT_A_NUMBER,
        index + 1
      )
    );
  });

  it("유저가 음수를 입력한 경우, 에러메시지를 alert로 출력한다", () => {
    const wrongUserInput = -300;
    testAlertMessage(wrongUserInput, ALERT_MESSAGE.ERROR.CASH_INPUT.NEGATIVE);
  });

  it("유저가 소수를 입력한 경우, 에러메시지를 alert로 출력한다", () => {
    const wrongUserInput = -100.3;
    testAlertMessage(wrongUserInput, ALERT_MESSAGE.ERROR.CASH_INPUT.DECIMAL);
  });
});
