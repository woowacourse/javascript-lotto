import { ALERT_MESSAGE } from "../../../src/js/Util/constants.js";

import {
  isBlankIncluded,
  isDuplicatedNumber,
  isInvalidLottoNumberRange,
} from "../../../src/js/Util/validator.js";

context("e2e test", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/index.html");
  });

  it("초기 상태에서 입력 창 아래 부분이 숨김 처리 되어 있는 것을 확인한다.", () => {
    cy.get("section").eq(0).should("have.class", "hidden");
    cy.get("form").eq(1).should("have.class", "hidden");
  });

  it("1000이상, 5000이하, 1000의 배수 입력 시 alert 창이 나타나지 않는다", () => {
    cy.get("#purchase-amount-input").type("2000");
    cy.get("#purchase-amount-submit-button").click();
    cy.get("section").eq(0).should("not.have.class", "hidden");
    cy.get("form").eq(1).should("not.have.class", "hidden");
  });

  it("1000이상, 5000이하, 1000의 배수가 아닌 수 입력 시 alert 창이 나타난다", () => {
    const stub = cy.stub();

    cy.on("window:alert", stub);

    cy.get("#purchase-amount-input").type("1100");
    cy.get("#purchase-amount-submit-button")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          ALERT_MESSAGE.NOT_THOUSAND_MULTIPLES
        );
      });
    cy.reload();

    cy.get("#purchase-amount-input").type("4350");
    cy.get("#purchase-amount-submit-button")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          ALERT_MESSAGE.NOT_THOUSAND_MULTIPLES
        );
      });
  });

  it("1000미만, 5000초과, 1000의 배수 입력 시 alert 창이 나타난다", () => {
    const stub = cy.stub();

    cy.on("window:alert", stub);

    cy.get("#purchase-amount-input").type("6000");
    cy.get("#purchase-amount-submit-button")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          ALERT_MESSAGE.INVALID_MONEY_RANGE
        );
      });
    cy.reload();

    cy.get("#purchase-amount-input").type("0");
    cy.get("#purchase-amount-submit-button")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          ALERT_MESSAGE.INVALID_MONEY_RANGE
        );
      });
  });

  it("문자를 포함한 입력 시 alert 창이 나타난다", () => {
    const stub = cy.stub();

    cy.on("window:alert", stub);

    cy.get("#purchase-amount-input").type("e");
    cy.get("#purchase-amount-submit-button")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(ALERT_MESSAGE.INVALID_NUMBER);
      });
    cy.reload();

    cy.get("#purchase-amount-input").type("3e3");
    cy.get("#purchase-amount-submit-button")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(ALERT_MESSAGE.INVALID_NUMBER);
      });
    cy.reload();

    cy.get("#purchase-amount-submit-button")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(ALERT_MESSAGE.INVALID_NUMBER);
      });
    cy.reload();

    cy.get("#purchase-amount-input").type("으");
    cy.get("#purchase-amount-submit-button")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(ALERT_MESSAGE.INVALID_NUMBER);
      });
  });

  // (하나의) 로또에서 생성된 번호가 1-45 안에 있는지 확인
  // it("생성된 번호가 1부터 45 범위 안에 있는지 확인한다.", () => {
  //   cy.get("#purchase-amount-input").type("1000");
  //   cy.get("#purchase-amount-submit-button").click();
  // const lst = new Lotto;
  // console.log(Lotto.numbers);
  // });

  it("구입 금액으로 살 수 있는 로또의 개수가 purchase-amount-label의 텍스트에 나타난 숫자와 동일한지 확인한다.", () => {
    const money = 3000;

    cy.get("#purchase-amount-input").type(money);
    cy.get("#purchase-amount-submit-button").click();
    cy.get("#purchase-amount-label").should(
      "contain",
      `총 ${money / 1000}개를 구매하였습니다.`
    );
  });

  it("구입 금액으로 살 수 있는 로또의 개수만큼 로또 용지 그림이 출력되는 것을 확인한다.", () => {
    const money = 4000;

    cy.get("#purchase-amount-input").type(money);
    cy.get("#purchase-amount-submit-button").click();
    cy.get("#ticket-image-number-container")
      .find(".text-4xl")
      .its("length")
      .should("eq", money / 1000);
  });

  it("토글 버튼을 클릭하면 각 로또의 번호가 출력된다.", () => {
    cy.get("#purchase-amount-input").type(3000);
    cy.get("#purchase-amount-submit-button").click();
    cy.get("#lotto-image-number")
      .children()
      .should(($children) => {
        expect($children.length).to.eq(1);
      });

    cy.get(".toggle-button").click({ force: true });
    cy.get("#lotto-image-number")
      .children()
      .should(($children) => {
        expect($children.length).to.eq(2);
      });
  });

  it("당첨 번호, 보너스 번호 입력 검증을 할 수 있다.", () => {
    const validNumbers = [1, 10, 25, 33, 44, 45, 42];

    expect(isBlankIncluded([1, 10, 25, 33, 44, 45, ""])).to.be.true;
    expect(isBlankIncluded(validNumbers)).to.be.false;

    expect(isInvalidLottoNumberRange([1, 10, 25, 33, 44, 45, 46])).to.be.true;
    expect(isInvalidLottoNumberRange(validNumbers)).to.be.false;

    expect(isDuplicatedNumber([1, 10, 25, 33, 44, 45, 45])).to.be.true;
    expect(isDuplicatedNumber(validNumbers)).to.be.false;
  });
});
