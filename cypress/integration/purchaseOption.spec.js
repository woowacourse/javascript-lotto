import { ELEMENT } from "../../src/js/Util/constants.js";

describe("purchaseOption container를 테스트한다", () => {
  const money = "5000";

  beforeEach(() => {
    cy.visit("/");

    cy.get(ELEMENT.PURCHASE_AMOUNT_INPUT).type(money);
    cy.get(ELEMENT.PURCHASE_AMOUNT_SUBMIT_BUTTON).click();
  });

  it("구입 금액을 잔액에서 확인할 수 있다.", () => {
    cy.get(ELEMENT.PURCHASE_BALANCE_LABEL)
      .invoke("text")
      .should("eq", `잔액 : ${Number(money).toLocaleString()}원`);
  });
});
