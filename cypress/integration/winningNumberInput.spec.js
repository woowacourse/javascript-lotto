import {
  ALERT_MESSAGE,
  CLASSNAME,
  JS_SELECTOR,
} from "../../src/js/constants/index.js";
import {
  toDataAttributeSelector as toDAS,
  toClassSelector as toCS,
} from "../../src/js/utils/querySelector.js";

describe("당첨 번호 입력 테스트", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.window().then((win) => cy.stub(win, "alert").as("windowAlert"));
    const userInput = 4500;
    cy.get(toDAS(JS_SELECTOR.CASH.INPUT)).type(userInput);
    cy.get(toDAS(JS_SELECTOR.CASH.BUTTON)).click();
  });

  it("유저가 정상적으로 로또를 구매한 후 당첨번호를 모두 입력하지 않았을 때 에러메시지를 alert로 출력한다", () => {
    const WINNING_NUMBERS = [" ", 5, 8, 34, 44, 45];
    const BONUS_NUMBER = 7;

    WINNING_NUMBERS.forEach((number, index) => {
      const inputClassName = `${CLASSNAME.WINNING_NUMBER.INPUT}:nth-child(${
        index + 1
      })`;
      cy.get(toCS(inputClassName)).type(number);
    });
    cy.get(toCS(CLASSNAME.WINNING_NUMBER.BONUS_INPUT)).type(BONUS_NUMBER);

    cy.get(toCS(CLASSNAME.MODAL)).should("not.be.visible");
    cy.get(toCS(CLASSNAME.WINNING_NUMBER.OPEN_RESULT_MODAL_BUTTON)).click();
    cy.get("@windowAlert").should(
      "be.calledWith",
      ALERT_MESSAGE.ERROR.WINNING_NUMBERS_INPUT.EMPTY
    );
    cy.get(toCS(CLASSNAME.MODAL)).should("not.be.visible");
  });

  it("유저가 정상적으로 로또를 구매한 후 중복된 당첨번호를 입력했을 때 에러메시지를 alert로 출력한다", () => {
    const WINNING_NUMBERS = [45, 5, 8, 34, 44, 45];
    const BONUS_NUMBER = 7;

    WINNING_NUMBERS.forEach((number, index) => {
      const inputClassName = `${CLASSNAME.WINNING_NUMBER.INPUT}:nth-child(${
        index + 1
      })`;
      cy.get(toCS(inputClassName)).type(number);
    });
    cy.get(toCS(CLASSNAME.WINNING_NUMBER.BONUS_INPUT)).type(BONUS_NUMBER);

    cy.get(toCS(CLASSNAME.MODAL)).should("not.be.visible");
    cy.get(toCS(CLASSNAME.WINNING_NUMBER.OPEN_RESULT_MODAL_BUTTON)).click();
    cy.get("@windowAlert").should(
      "be.calledWith",
      ALERT_MESSAGE.ERROR.WINNING_NUMBERS_INPUT.DUPLICATED
    );
    cy.get(toCS(CLASSNAME.MODAL)).should("not.be.visible");
  });

  it("유저가 정상적으로 로또를 구매한 후 중복된 보너스 번호를 입력했을 때 에러메시지를 alert로 출력한다", () => {
    const WINNING_NUMBERS = [1, 5, 8, 34, 44, 45];
    const BONUS_NUMBER = 45;

    WINNING_NUMBERS.forEach((number, index) => {
      const inputClassName = `${CLASSNAME.WINNING_NUMBER.INPUT}:nth-child(${
        index + 1
      })`;
      cy.get(toCS(inputClassName)).type(number);
    });
    cy.get(toCS(CLASSNAME.WINNING_NUMBER.BONUS_INPUT)).type(BONUS_NUMBER);

    cy.get(toCS(CLASSNAME.MODAL)).should("not.be.visible");
    cy.get(toCS(CLASSNAME.WINNING_NUMBER.OPEN_RESULT_MODAL_BUTTON)).click();
    cy.get("@windowAlert").should(
      "be.calledWith",
      ALERT_MESSAGE.ERROR.WINNING_NUMBERS_INPUT.DUPLICATED
    );
    cy.get(toCS(CLASSNAME.MODAL)).should("not.be.visible");
  });

  it("유저가 정상적으로 로또를 구매한 후 당첨 번호를 입력했을 때 결과 모달이 나타난다", () => {
    const WINNING_NUMBERS = [1, 5, 8, 34, 44, 45];
    const BONUS_NUMBER = 7;

    WINNING_NUMBERS.forEach((number, index) => {
      const inputClassName = `${CLASSNAME.WINNING_NUMBER.INPUT}:nth-child(${
        index + 1
      })`;
      cy.get(toCS(inputClassName)).type(number);
    });
    cy.get(toCS(CLASSNAME.WINNING_NUMBER.BONUS_INPUT)).type(BONUS_NUMBER);

    cy.get(toCS(CLASSNAME.MODAL)).should("not.be.visible");
    cy.get(toCS(CLASSNAME.WINNING_NUMBER.OPEN_RESULT_MODAL_BUTTON)).click();
    cy.get(toCS(CLASSNAME.MODAL)).should("be.visible");
  });
});
