import { SELECTOR, ERROR_MESSAGE } from "../../src/js/constant.js";

const typeAndClickPrice = (price) => {
  cy.get(SELECTOR.BUY_INPUT).type(price);
  cy.get(SELECTOR.BUY_BUTTON).click();
};

describe("given", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/");
  });

  it("사이트 접속시에 제목과 구입 금액 영역만 보여진다.", () => {
    cy.get(SELECTOR.BUY).children().should("exist");
    cy.get(SELECTOR.POCKET).children().should("not.exist");
    cy.get(SELECTOR.WINNING).children().should("not.exist");
  });
});

describe("ui-play", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/");
  });

  it("금액을 입력하고 버튼을 클릭하면 구매 내역 영역과 당첨 번호 확인 영역이 보여진다", () => {
    typeAndClickPrice("5000");
    cy.get(SELECTOR.POCKET).children().should("exist");
    cy.get(SELECTOR.WINNING).children().should("exist");
  });

  it("금액을 입력하고 버튼을 클릭하면 입력 금액/1000 개의 로또 이모지가 보여진다.", () => {
    for (let i = 1; i < 20; i++) {
      typeAndClickPrice((i * 1000).toString());
      cy.get(SELECTOR.POCKET_LOTTOS).children().its("length").should("eq", i);
      cy.reload();
    }
  });

  it("번호보기 토글 버튼을 클릭하면 각 로또 이모지와 로또 번호 6자리가 보여진다.", () => {
    typeAndClickPrice("5000");
    cy.get(SELECTOR.POCKET_TOGGLE).click({ force: true });
    cy.get(SELECTOR.POCKET_LOTTO).should("exist");
    cy.get(SELECTOR.POCKET_LOTTO).each(($numbers) => {
      expect($numbers.text().split(" ").length).to.eq(6);
    });
  });

  it("번호보기 토클 버튼을 클릭했을 때 나오는 각 로또 번호들은 서로 달라야 한다.", () => {
    typeAndClickPrice("5000");
    cy.get(SELECTOR.POCKET_TOGGLE).click({ force: true });
    cy.get(SELECTOR.POCKET_LOTTO).should("exist");
    cy.get(SELECTOR.POCKET_LOTTO).each(($numbers) => {
      expect(new Set($numbers.text().split(" ")).size).to.eq(6);
    });
  });

  it("번호보기 토클 버튼을 클릭했을 때 나오는 각 로또 번호들은 1이상 45이하 사이여야 한다.", () => {
    typeAndClickPrice("10000");
    cy.get(SELECTOR.POCKET_TOGGLE).click({ force: true });
    cy.get(SELECTOR.POCKET_LOTTO).should("exist");
    cy.get(SELECTOR.POCKET_LOTTO).each(($numbers) => {
      cy.get($numbers.text().split(" ")).each(($number) => {
        cy.wrap(parseInt($number, 10)).should("be.lte", 45).and("be.gte", 1);
      });
    });
  });
});

describe("exceptions", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/");
    cy.window()
      .then((win) => cy.stub(win, "alert"))
      .as("alertStub");
  });

  const alertShouldBeCalledWith = (message) => {
    cy.get("@alertStub").should("be.calledWith", message);
  };

  it("금액에 소수점을 입력했을때 alert가 발생한다", () => {
    typeAndClickPrice("432.13");
    alertShouldBeCalledWith(ERROR_MESSAGE.PRICE_CANNOT_BE_FLOAT);
  });

  it("금액에 음수를 입력했을때 alert가 발생한다", () => {
    typeAndClickPrice("-1000");
    alertShouldBeCalledWith(ERROR_MESSAGE.PRICE_CANNOT_BE_NEGATIVE);
  });

  it("금액에 1000원 미만을 입력했을때 alert가 발생한다", () => {
    typeAndClickPrice("500");
    alertShouldBeCalledWith(ERROR_MESSAGE.PRICE_CANNOT_BE_LESS_THAN_THOUSAND);
  });

  it("금액을 입력하고 확인 누른 뒤, 다시 금액을 입력하고 확인을 누르면 alert가 발생한다.", () => {
    typeAndClickPrice("5000");
    typeAndClickPrice("1000");
    alertShouldBeCalledWith(ERROR_MESSAGE.PRICE_CANNOT_BE_OVERWRITTEN);
  });
});
