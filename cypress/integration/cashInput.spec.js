import { JS_SELECTOR } from "../../src/js/constants/index.js";
import { toDataAttributeSelector } from "../../src/js/utils/querySelector.js";

describe("구입 금액 입력 테스트", () => {
  before(() => {
    cy.visit("/");
  });

  it("초기화면에 구입 입력 Form이 보여진다.", () => {
    cy.get(toDataAttributeSelector(JS_SELECTOR.CASH_INPUT.CONTAINER)).should(
      "be.visible"
    );
    cy.get(toDataAttributeSelector(JS_SELECTOR.CASH_INPUT.INPUT)).should(
      "be.visible"
    );
    cy.get(toDataAttributeSelector(JS_SELECTOR.CASH_INPUT.BUTTON)).should(
      "be.visible"
    );
  });
});
