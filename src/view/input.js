import validatePrice from "../domain/validatePrice.js";
import validateRestart from "../domain/validateRestart.js";
import {
  validateBonusNumber,
  validateWinningNumbers,
} from "../domain/validateWinningNumbers.js";
import retryUntilValid from "../utils/retryUntilValid.js";

export const getLottoPrice = () =>
  retryUntilValid("구입금액을 입력해 주세요. ", validatePrice);

export const getWinningNumbers = () =>
  retryUntilValid("\n당첨 번호를 입력해 주세요. ", validateWinningNumbers);

export const getBonusNumber = (winningNumbers) => {
  return retryUntilValid("\n보너스 번호를 입력해 주세요. ", (bonusNumber) =>
    validateBonusNumber(bonusNumber, winningNumbers)
  );
};

export const getRestart = () =>
  retryUntilValid("\n다시 시작하시겠습니까? (y/n) ", validateRestart);
