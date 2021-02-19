import { INVALID_PRICE_ERROR } from "../../src/js/lotto/constants.js";

describe("lotto 미션 테스트", () => {
  before(() => {
    cy.visit("http://127.0.0.1:5500/");
  });

  it("구입 금액에 1000원 단위가 아닌 금액을 입력하면 경고 메시지를 보여준다.", () => {
    const alertCalled = cy.stub();
    cy.on("window:alert", alertCalled);

    cy.get("#price-input").type("1234");
    cy.get("#price-submit-button")
      .click()
      .then(() => {
        expect(alertCalled.getCall(0)).to.be.calledWith(INVALID_PRICE_ERROR);
      });
  });

  it("구입 금액에 0원을 입력하면 경고 메시지를 보여준다.", () => {
    const alertCalled = cy.stub();
    cy.on("window:alert", alertCalled);

    cy.get("#price-input").type("0");
    cy.get("#price-submit-button")
      .click()
      .then(() => {
        expect(alertCalled.getCall(0)).to.be.calledWith(INVALID_PRICE_ERROR);
      });
  });

  it("구입 금액에 음수을 입력하면 경고 메시지를 보여준다.", () => {
    const alertCalled = cy.stub();
    cy.on("window:alert", alertCalled);

    cy.get("#price-input").type("-1000");
    cy.get("#price-submit-button")
      .click()
      .then(() => {
        expect(alertCalled.getCall(0)).to.be.calledWith(INVALID_PRICE_ERROR);
      });
  });

  it("구입 금액에 아무것도 입력하지 않으면 경고 메시지를 보여준다.", () => {
    const alertCalled = cy.stub();
    cy.on("window:alert", alertCalled);

    cy.get("#price-submit-button")
      .click()
      .then(() => {
        expect(alertCalled.getCall(0)).to.be.calledWith(INVALID_PRICE_ERROR);
      });
  });

  it("확인버튼 클릭시 금액에 맞는 수의 로또를 보여준다.", () => {
    cy.get("#price-input").type("3000");
    cy.get("#price-submit-button").click();
    cy.get("#confirmation").should("be.visible");
    cy.get("#lotto-list-label").should("have.text", "총 3개를 구매하였습니다.");
    cy.get("#lotto-tickets").children().should("have.length", 3);
  });

  it("번호보기가 true이면 로또 번호를 보여준다.", () => {
    cy.get(".switch").click();
    cy.get(".winning-numbers").each(($winningNumber) => {
      const isNumbers = $winningNumber[0].innerText
        .split(",")
        .every((value) => !isNaN(value.trim()));

      expect(isNumbers).to.be.true;
    });
  });

  it("알맞지 않은 금액을 입력하면 모든 view가 초기화 된다.", () => {
    cy.get("#price-input").type("3");
    cy.get("#price-submit-button").click();
    cy.get("#price-input").should("have.value", "");
    cy.get("#confirmation").should("not.be.visible");
  });

  it("금액 입력 후 엔터키를 누르면 금액에 맞는 수의 로또를 보여준다.", () => {
    cy.get("#price-input").type("5000{enter}");
    cy.get("#confirmation").should("be.visible");
    cy.get("#lotto-list-label").should("have.text", "총 5개를 구매하였습니다.");
    cy.get("#lotto-tickets").children().should("have.length", 5);
  });
});
