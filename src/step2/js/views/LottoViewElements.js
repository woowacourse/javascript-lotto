import { LOTTO_RANK } from "../../../constants/config.js";
import { SELECTORS } from "../../constants/config.js";

import { $, $All } from "../utils/utils";

export function getLottoViewElements() {
  const winningNumberInputs = Array.from($All(SELECTORS.WINNING.NUMBER_INPUTS));
  const bonusInput = $(SELECTORS.WINNING.BONUS_INPUT);

  return {
    $purchaseForm: $(SELECTORS.PURCHASE.FORM),
    $purchaseInput: $(SELECTORS.PURCHASE.INPUT),
    $resultSection: $(SELECTORS.RESULT.SECTION),
    $resultText: $(SELECTORS.RESULT.TEXT),
    $resultContainer: $(SELECTORS.RESULT.CONTAINER),
    $winningSection: $(SELECTORS.WINNING.SECTION),
    $winningForm: $(SELECTORS.WINNING.FORM),
    $winningNumberInputs: winningNumberInputs,
    $bonusInput: bonusInput,
    $winningInputs: [...winningNumberInputs, bonusInput],
    $modalContainer: $(SELECTORS.MODAL.CONTAINER),
    $modalCloseBtn: $(SELECTORS.MODAL.CLOSE_BUTTON),
    $restartBtn: $(SELECTORS.MODAL.RESTART_BUTTON),
    $resultProfitRate: $(SELECTORS.MODAL.PROFIT_RATE),
    $matchCountElements: SELECTORS.MODAL.MATCH_ROWS.map(({ rankKey, selector }) => ({
      element: $(selector),
      matchCount: LOTTO_RANK[rankKey].matchCount,
      requireBonus: LOTTO_RANK[rankKey].requireBonus,
    })),
  };
}
