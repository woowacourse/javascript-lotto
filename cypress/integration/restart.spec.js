import { CLASSNAME, JS_SELECTOR } from "../../src/js/constants/index.js";
import { Lotto } from "../../src/js/models/index.js";
import {
  toClassSelector as toCS,
  toDataAttributeSelector as toDAS,
} from "../../src/js/utils/index.js";

describe("다시 시작하기 테스트: 당첨 결과에 대한 모달이 표시된다.", () => {
  before(() => {
    cy.visit("/");

    const userInput = 4500;
    cy.get(toDAS(JS_SELECTOR.CASH.INPUT)).type(userInput);
    cy.get(toDAS(JS_SELECTOR.CASH.BUTTON)).click();

    const WINNING_NUMBERS = [1, 5, 8, 34, 44, 45];
    const BONUS_NUMBER = 7;

    WINNING_NUMBERS.forEach((number, index) => {
      const inputClassName = `${CLASSNAME.WINNING_NUMBER.INPUT}:nth-child(${
        index + 1
      })`;
      cy.get(toCS(inputClassName)).type(number);
    });
    cy.get(toCS(CLASSNAME.WINNING_NUMBER.BONUS_INPUT)).type(BONUS_NUMBER);

    cy.get(toCS(CLASSNAME.WINNING_NUMBER.OPEN_RESULT_MODAL_BUTTON)).click();
  });

  it("유저가 다시 시작하기 버튼을 클릭하면 모달창이 닫히고 구매한 로또 정보와 당첨 번호에 대한 모든 데이터가 초기화 된다.", () => {
    cy.get(toCS(CLASSNAME.MODAL)).should("be.visible");
    cy.get(toDAS(JS_SELECTOR.WINNING_NUMBER.CONTAINER)).should("be.visible");
    cy.get(toDAS(JS_SELECTOR.LOTTO_DETAIL.CONTAINER)).should("be.visible");

    cy.get(toDAS(JS_SELECTOR.MODAL.RESTART_BUTTON)).click();

    cy.get(toCS(CLASSNAME.MODAL)).should("not.be.visible");
    cy.get(toDAS(JS_SELECTOR.WINNING_NUMBER.CONTAINER)).should(
      "not.be.visible"
    );
    cy.get(toDAS(JS_SELECTOR.LOTTO_DETAIL.CONTAINER)).should("not.be.visible");
    cy.get(toDAS(JS_SELECTOR.CASH.INPUT)).should("have.value", "");
    cy.get(toCS(CLASSNAME.WINNING_NUMBER.INPUT)).each(($winningNumber) =>
      $winningNumber.should("have.value", "")
    );
    cy.get(toCS(CLASSNAME.WINNING_NUMBER.BONUS_INPUT)).should("have.value", "");

    const userInput = 5500;
    const lottoCount = Math.floor(userInput / Lotto.UNIT_PRICE);
    cy.get(toDAS(JS_SELECTOR.CASH.INPUT)).type(userInput);
    cy.get(toDAS(JS_SELECTOR.CASH.BUTTON)).click();

    cy.get(toDAS(JS_SELECTOR.LOTTO_DETAIL.CONTAINER)).should("be.visible");
    cy.get(toDAS(JS_SELECTOR.LOTTO_DETAIL.LABEL)).should(
      "have.text",
      `총 ${lottoCount}개를 구매하였습니다.`
    );
    cy.get(toDAS(JS_SELECTOR.LOTTO_DETAIL.ICON)).should(
      "have.length",
      lottoCount
    );

    cy.get(toDAS(JS_SELECTOR.WINNING_NUMBER.CONTAINER)).should("be.visible");
    cy.get(toDAS(JS_SELECTOR.CASH.INPUT)).should("have.value", "");
  });
});
