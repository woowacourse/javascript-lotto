import TicketBundle from "../../src/js/Model/TicketBundle.js";
import {
  ALERT_MESSAGE,
  ELEMENT,
  STANDARD_NUMBER,
} from "../../src/js/Util/constants.js";
import {
  isBlankIncluded,
  isDuplicatedNumber,
  isInvalidLottoNumberRange,
} from "../../src/js/Util/validator.js";

context("e2e test", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  const money = 5000;

  it("초기 상태에서 입력 창 아래 부분이 숨김 처리 되어 있는 것을 확인한다.", () => {
    cy.get("section").eq(0).should("have.class", ELEMENT.HIDDEN);
    cy.get("form").eq(1).should("have.class", ELEMENT.HIDDEN);
  });

  it("1000이상, 5000이하, 1000의 배수 입력 시 alert 창이 나타나지 않는다", () => {
    cy.get(ELEMENT.PURCHASE_AMOUNT_INPUT).type("2000");
    cy.get(ELEMENT.PURCHASE_AMOUNT_SUBMIT_BUTTON).click();
    cy.on("window:alert", (str) => {
      expect(str).to.be.true;
    });
  });

  it("1000이상, 5000이하, 1000의 배수가 아닌 수 입력 시 alert 창이 나타난다", () => {
    const stub = cy.stub();

    cy.on("window:alert", stub);

    cy.get(ELEMENT.PURCHASE_AMOUNT_INPUT).type("1100");
    cy.get(ELEMENT.PURCHASE_AMOUNT_SUBMIT_BUTTON)
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          ALERT_MESSAGE.NOT_THOUSAND_MULTIPLES
        );
      });
    cy.reload();

    cy.get(ELEMENT.PURCHASE_AMOUNT_INPUT).type("4350");
    cy.get(ELEMENT.PURCHASE_AMOUNT_SUBMIT_BUTTON)
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

    cy.get(ELEMENT.PURCHASE_AMOUNT_INPUT).type("6000");
    cy.get(ELEMENT.PURCHASE_AMOUNT_SUBMIT_BUTTON)
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          ALERT_MESSAGE.INVALID_MONEY_RANGE
        );
      });
    cy.reload();

    cy.get(ELEMENT.PURCHASE_AMOUNT_INPUT).type("0");
    cy.get(ELEMENT.PURCHASE_AMOUNT_SUBMIT_BUTTON)
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

    cy.get(ELEMENT.PURCHASE_AMOUNT_INPUT).type("e");
    cy.get(ELEMENT.PURCHASE_AMOUNT_SUBMIT_BUTTON)
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(ALERT_MESSAGE.INVALID_NUMBER);
      });
    cy.reload();

    cy.get(ELEMENT.PURCHASE_AMOUNT_INPUT).type("3e3");
    cy.get(ELEMENT.PURCHASE_AMOUNT_SUBMIT_BUTTON)
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(ALERT_MESSAGE.INVALID_NUMBER);
      });
    cy.reload();

    cy.get(ELEMENT.PURCHASE_AMOUNT_SUBMIT_BUTTON)
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(ALERT_MESSAGE.INVALID_NUMBER);
      });
    cy.reload();

    cy.get(ELEMENT.PURCHASE_AMOUNT_INPUT).type("으");
    cy.get(ELEMENT.PURCHASE_AMOUNT_SUBMIT_BUTTON)
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(ALERT_MESSAGE.INVALID_NUMBER);
      });
  });

  it("생성된 번호가 1부터 45 범위 안에 있는지 확인한다.", () => {
    const ticketBundle = new TicketBundle();
    const checkingArray = ticketBundle.generateRandomNumbers();

    checkingArray.forEach((number) => {
      expect(0 < number && number < 46).to.be.true;
    });
  });

  it("구입 금액으로 살 수 있는 로또의 개수가 잔액에 표시되는 숫자와 동일한지 확인한다.", () => {
    cy.get(ELEMENT.PURCHASE_AMOUNT_INPUT).type(money);
    cy.get(ELEMENT.PURCHASE_AMOUNT_SUBMIT_BUTTON).click();
    cy.get(ELEMENT.PURCHASE_BALANCE_LABEL).then(($label) => {
      expect($label).to.have.text(`잔액 : ${money.toLocaleString()}원`);
    });
  });

  it("금액을 입력한 후, 로또 발급 버튼을 누르면 전체 금액의 로또가 생성되는지 확인한다. ", () => {
    getAutoNumberTicketsBy(5000);
    cy.get(ELEMENT.PURCHASE_AMOUNT_LABEL).then(($label) => {
      expect($label).to.have.text(
        `총 ${money / STANDARD_NUMBER.ONE_TICKET_PRICE}개를 구매하였습니다.`
      );
    });
  });

  it("구입 금액으로 살 수 있는 로또의 개수만큼 로또 용지 그림이 출력되는 것을 확인한다.", () => {
    getAutoNumberTicketsBy(5000);
    cy.get(ELEMENT.TICKET_IMAGE_NUMBER_AREA)
      .find(".text-4xl")
      .its("length")
      .should("eq", money / STANDARD_NUMBER.ONE_TICKET_PRICE);
  });

  it("토글 버튼을 클릭하면 각 로또의 번호가 출력된다.", () => {
    getAutoNumberTicketsBy(5000);

    cy.get(ELEMENT.TOGGLE_BUTTON).click({ force: true });
    cy.get(ELEMENT.LOTTO_IMAGE_NUMBER)
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

  it("결과 확인 버튼을 누르면 모달창이 나타난다.", () => {
    const firstNumber = 1;
    const bonusNumber = 7;

    getAutoNumberTicketsBy(5000);
    typeWinningNumberFrom(firstNumber, bonusNumber);

    cy.get(ELEMENT.MODAL).should("to.be.visible");
  });

  it.only("다시 시작하기 버튼을 누르면 초기화 돼서 다시 구매를 시작할 수 있다.", () => {
    const firstNumber = 1;
    const bonusNumber = 7;

    getAutoNumberTicketsBy(5000);
    typeWinningNumberFrom(firstNumber, bonusNumber);

    cy.get(ELEMENT.MODAL).should("to.be.visible");
    cy.get(ELEMENT.RESTART_BUTTON).click();

    cy.get(ELEMENT.MODAL).should("not.to.be.visible");
    cy.get("section").eq(0).should("have.class", ELEMENT.HIDDEN);
    cy.get("form").eq(1).should("have.class", ELEMENT.HIDDEN);
  });

  it("구입 금액을 입력하면 자동 및 수동 구매할 수 있는 창이 나타난다.", () => {
    cy.get(ELEMENT.PURCHASE_AMOUNT_INPUT).type("3000");
    cy.get(ELEMENT.PURCHASE_AMOUNT_SUBMIT_BUTTON).click();
    cy.get(ELEMENT.PURCHASE_OPTION_CONTAINER).should("to.be.visible");
  });
});

const getAutoNumberTicketsBy = (money) => {
  cy.get(ELEMENT.PURCHASE_AMOUNT_INPUT).type(money);
  cy.get(ELEMENT.PURCHASE_AMOUNT_SUBMIT_BUTTON).click();
  cy.get(ELEMENT.PURCHASE_PAYMENT_BUTTON).click();
};

const typeWinningNumberFrom = (firstNumber, bonusNumber) => {
  cy.get(ELEMENT.WINNING_NUMBER).each((number) => {
    cy.wrap(number).type(firstNumber++);
  });
  cy.get(ELEMENT.BONUS_NUMBER).type(bonusNumber);

  cy.get(ELEMENT.OPEN_RESULT_MODAL_BUTTON).click();
};
