import { ALERT_MESSAGE, JS_SELECTOR } from "../../src/js/constants/index.js";
import { Lotto } from "../../src/js/models/index.js";
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
      cy.get(toDAS(JS_SELECTOR.CASH.INPUT)).type(wrongUserInput);
    }

    cy.get(toDAS(JS_SELECTOR.CASH.BUTTON)).click();

    cy.get("@windowAlert")
      .should("have.callCount", callCount++)
      .its("lastCall")
      .should("be.calledWith", alertMessage);
  };

  it("초기화면에 구입 입력 Form이 보여진다.", () => {
    cy.get(toDAS(JS_SELECTOR.CASH.CONTAINER)).should("be.visible");
    cy.get(toDAS(JS_SELECTOR.CASH.INPUT)).should("be.visible");
    cy.get(toDAS(JS_SELECTOR.CASH.BUTTON)).should("be.visible");
    cy.get(toDAS(JS_SELECTOR.LOTTO_DETAIL.CONTAINER)).should("not.be.visible");
    cy.get(toDAS(JS_SELECTOR.WINNING_NUMBER.CONTAINER)).should(
      "not.be.visible"
    );
    cy.get(".modal").should("not.be.visible");
  });

  it("유저가 숫자로 변환될 수 없는 문자를 입력한 경우, 에러메시지를 alert로 출력한다", () => {
    ["", "김동희", "+", "abcd", "🎟️"].forEach((wrongUserInput, index) => {
      testAlertMessage(
        wrongUserInput,
        ALERT_MESSAGE.ERROR.CASH_INPUT.NOT_A_NUMBER,
        index + 1
      );
      cy.get(toDAS(JS_SELECTOR.CASH.INPUT)).should("have.value", "");
    });
  });

  it("유저가 1000원 미만의 금액을 입력한 경우, 에러메시지를 alert로 출력한다", () => {
    [-300, 500].forEach((wrongUserInput, index) => {
      testAlertMessage(
        wrongUserInput,
        ALERT_MESSAGE.ERROR.CASH_INPUT.UNDER_LOTTO_PRICE,
        index + 1
      );
      cy.get(toDAS(JS_SELECTOR.CASH.INPUT)).should("have.value", "");
    });
  });

  it("유저가 유효한 금액을 입력한 경우, 구매 모달창을 띄운다.", () => {
    const userInput = 4500;
    const lottoCount = Math.floor(userInput / Lotto.UNIT_PRICE);
    cy.get(toDAS(JS_SELECTOR.CASH.INPUT)).type(userInput);
    cy.get(toDAS(JS_SELECTOR.CASH.BUTTON)).click();

    cy.get(toDAS(JS_SELECTOR.WINNING_NUMBER.CONTAINER)).should("be.visible");
    cy.get(toDAS(JS_SELECTOR.CASH.INPUT)).should("have.value", "");
  });
});
