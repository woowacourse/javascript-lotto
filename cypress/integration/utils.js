import { CLASSNAME } from "../../src/js/constants";
import { toClassSelector as toCS } from "../../src/js/utils";

const typeWinningNumbers = (winningNumbers, bonusNumber) => {
  cy.get(toCS(CLASSNAME.WINNING_NUMBER.INPUT)).each(($input, index) => {
    cy.wrap($input).type(winningNumbers[index]);
  });
  cy.get(toCS(CLASSNAME.WINNING_NUMBER.BONUS_INPUT)).type(bonusNumber);
};

export { typeWinningNumbers };
