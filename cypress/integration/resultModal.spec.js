import { CLASSNAME, JS_SELECTOR } from "../../src/js/constants/index.js";
import { Lotto } from "../../src/js/models/index.js";
import {
  toClassSelector as toCS,
  toDataAttributeSelector as toDAS,
} from "../../src/js/utils/index.js";
import { typeWinningNumbers } from "./utils.js";

describe("당첨 결과 모달 테스트: 당첨 결과에 대한 모달이 표시된다", () => {
  const userInput = 4500;

  beforeEach(() => {
    cy.visit("/");

    cy.get(toDAS(JS_SELECTOR.CASH.INPUT)).type(userInput);
    cy.get(toDAS(JS_SELECTOR.CASH.BUTTON)).click();
    cy.get(toDAS(JS_SELECTOR.ISSUE_MANAGER.SUBMIT_BUTTON)).click();

    const WINNING_NUMBERS = [1, 5, 8, 34, 44, 45];
    const BONUS_NUMBER = 7;

    typeWinningNumbers(WINNING_NUMBERS, BONUS_NUMBER);

    cy.get(toCS(CLASSNAME.WINNING_NUMBER.OPEN_RESULT_MODAL_BUTTON)).click();
  });

  it("X 버튼을 눌렀을 경우에 결과화면 결과모달이 닫힌다", () => {
    cy.get(toCS(CLASSNAME.MODAL.CLOSE)).click();
    cy.get(toCS(CLASSNAME.MODAL)).should("not.be.visible");
  });

  it("모달의 외곽 어두운 부분(Dimmed)을 클릭한 경우에 결과화면 결과모달이 닫힌다", () => {
    cy.get(toCS(CLASSNAME.MODAL)).click("topLeft");
    cy.get(toCS(CLASSNAME.MODAL)).should("not.be.visible");
  });

  it("유저가 구매한 로또 정보에 대한 수익률이 결과모달에 표시된다", () => {
    let winningCounts = [];
    let winningMoneyUnits = [];
    cy.get(toDAS(JS_SELECTOR.MODAL.WINNING_MONEY_UNIT))
      .each(($winningMoneyUnit) => {
        winningMoneyUnits.push(
          Number($winningMoneyUnit.text().trim().replace(/,/g, ""))
        );
      })
      .then(() => {
        cy.get(toDAS(JS_SELECTOR.MODAL.WINNING_COUNT)).each(($winningCount) => {
          winningCounts.push(Number($winningCount.text().trim().slice(0, -1)));
        });
      })
      .then(() => {
        const totalWinningMoney = Array.from({
          length: winningMoneyUnits.length,
        }).reduce((total, _, index) => {
          return total + winningCounts[index] * winningMoneyUnits[index];
        }, 0);

        const investment = userInput - (userInput % Lotto.UNIT_PRICE);
        const profitRate = totalWinningMoney / investment - 1;
        const profitRateParagraph = `당신의 총 수익률은 ${profitRate.toLocaleString(
          "en-US",
          {
            style: "percent",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }
        )}입니다.`;

        cy.get(toDAS(JS_SELECTOR.MODAL.PROFIT_RATE_PARAGRAPH)).should(
          "have.text",
          profitRateParagraph
        );
      });
  });
});
