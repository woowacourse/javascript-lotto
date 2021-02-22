import { INVALID_PRICE_ERROR } from "../../src/js/constants.js";

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
    cy.get(".lotto-numbers").each(($winningNumber) => {
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

  it("지난 주 당첨번호를 입력하고 1등인지 확인한다.", () => {
    const baseNumber = new Array(46).fill(0);

    cy.get("#price-input").type("5000{enter}");
    cy.get("#confirmation").should("be.visible");
    cy.get("#lotto-list-label").should("have.text", "총 5개를 구매하였습니다.");
    cy.get("#lotto-tickets").children().should("have.length", 5);
    cy.get(".switch").click();
    cy.get(".lotto-numbers")
      .eq(0)
      .then((value) => {
        value[0].innerText.split(", ").forEach((v, i) => {
          baseNumber[Number(v)] = 1;
          cy.get(`input[name='winning-number']:nth-child(${i + 1})`).type(v);
        });
        cy.get("input[name='bonus-number']:nth-child(1)").type(
          baseNumber.lastIndexOf(0)
        );
      });
    cy.get("#open-result-modal-button")
      .click()
      .then(() => {
        cy.get("#prize-table > tr:nth-child(5) > td:nth-child(3)").should(
          "have.text",
          "1개"
        );
      });
  });

  it("다시 시작 버튼을 눌렀을 때 모든 뷰가 초기화 되는지 확인한다.", () => {
    cy.get("#restart-button").click();
    cy.get("#price-input").should("have.value", "");
    cy.get("#confirmation").should("not.be.visible");
  });
});
