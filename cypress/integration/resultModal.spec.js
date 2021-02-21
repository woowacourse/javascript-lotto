import { CLASSNAME, JS_SELECTOR, MONEY } from "../../src/js/constants/index.js";
import {
  toClassSelector as toCS,
  toDataAttributeSelector as toDAS,
} from "../../src/js/utils/index.js";

describe("당첨 결과 모달 테스트: 당첨 결과에 대한 모달이 표시된다", () => {
  const userInput = 4500;

  before(() => {
    cy.visit("/");

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

  it("X 버튼을 눌렀을 경우에 결과화면 결과모달이 닫힌다", () => {
    cy.get(toCS(CLASSNAME.MODAL.CLOSE)).click();
    cy.get(toCS(CLASSNAME.MODAL)).should("not.be.visible");
  });

  it("유저가 구매한 로또 정보에 대한 수익률이 결과모달에 표시된다", () => {
    let totalWinningMoney = 0;
    cy.get(".modal .result-table > tbody tr")
      .each(($tr) => {
        cy.wrap($tr)
          .children("td:nth-child(2)")
          .invoke("text")
          .then((winningMoneyUnitText) => {
            cy.wrap($tr)
              .children("td:nth-child(3)")
              .invoke("text")
              .then((winningCountText) => {
                const winningCount = Number(winningCountText.slice(0, -1));
                const winningMoneyUnit = Number(
                  winningMoneyUnitText.replace(/,/g, "")
                );
                totalWinningMoney += winningCount * winningMoneyUnit;
              });
          });
      })
      .then(() => {
        const investment = userInput - (userInput % MONEY.LOTTO_PRICE);
        const profitRate = totalWinningMoney / investment;
        const profitRateParagraph = `당신의 총 수익률은
        ${(profitRate * 100).toLocaleString("en-US", {
          style: "percent",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}입니다.`;

        cy.get(toDAS(JS_SELECTOR.MODAL.PROFIT_RATE_PARAGRAPH)).should(
          "have.text",
          profitRateParagraph
        );
      });
  });
});
