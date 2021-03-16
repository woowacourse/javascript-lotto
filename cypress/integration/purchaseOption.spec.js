import { ALERT_MESSAGE, ELEMENT } from "../../src/js/Util/constants.js";

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
      .should("eq", `구매 현황: 자동 1 장, 수동 0 장`);
  });

  it("올바른 번호 입력 후, 수동 구매 추가 버튼을 누르면 수동 1장이 추가된다.", () => {
    cy.get(ELEMENT.MANUAL_NUMBER).then((els) => {
      [...els].forEach((el, i) => cy.wrap(el).type(i + 1));
    });
    cy.get(ELEMENT.MANUAL_NUMBER_PURCHASE_BUTTON).click();
    cy.get(ELEMENT.PURCHASE_STATUS_LABEL)
      .invoke("text")
      .should("eq", `구매 현황: 자동 0 장, 수동 1 장`);
  });

  it("올바르지 않은 번호 입력 후, 수동 구매 추가 버튼을 누르면 alert가 나타난다.", () => {
    cy.get(ELEMENT.MANUAL_NUMBER).then((els) => {
      [...els].forEach((el, i) => cy.wrap(el).type(i));
    });

    const stub = cy.stub();
    cy.on("window:alert", stub);

    cy.get(ELEMENT.MANUAL_NUMBER_PURCHASE_BUTTON)
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          ALERT_MESSAGE.INVALID_NUMBER_RANGE
        );
      });
  });

  it("잔액이 없는 경우, 자동 구매 추가 버튼이나 수동 구매 추가 버튼을 누르면 alert가 나타난다", () => {
    cy.get(ELEMENT.AUTO_NUMBER_PURCHASE_BUTTON).click();
    cy.get(ELEMENT.AUTO_NUMBER_PURCHASE_BUTTON).click();
    cy.get(ELEMENT.AUTO_NUMBER_PURCHASE_BUTTON).click();
    cy.get(ELEMENT.AUTO_NUMBER_PURCHASE_BUTTON).click();
    cy.get(ELEMENT.AUTO_NUMBER_PURCHASE_BUTTON).click();

    const stub = cy.stub();
    cy.on("window:alert", stub);

    cy.get(ELEMENT.AUTO_NUMBER_PURCHASE_BUTTON)
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(ALERT_MESSAGE.NO_BALANCE);
      });
    cy.get(ELEMENT.MANUAL_NUMBER_PURCHASE_BUTTON)
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(ALERT_MESSAGE.NO_BALANCE);
      });
  });
});
