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

  it("자동 구매 추가 버튼을 누르면 자동 1장이 추가된다.", () => {
    cy.get(ELEMENT.AUTO_NUMBER_PURCHASE_BUTTON).click();
    cy.get(ELEMENT.PURCHASE_STATUS_LABEL)
      .invoke("text")
      .should("eq", `구매 현황: 자동 1장, 수동 0 장`);
  });
});
