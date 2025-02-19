import validatePrice from "../domain/validatePrice.js";
import {
  validateWinningNumbers,
  validateBonusNumber,
} from "../domain/validateWinningNumbers.js";
import retryUntilValid from "../utils/retryUntilValid.js";

export const getLottoPrice = () =>
  retryUntilValid("구입금액을 입력해 주세요.", validatePrice);

export const getWinningNumbers = () =>
  retryUntilValid("당첨 번호를 입력해 주세요.", validateWinningNumbers);

export const getBonusNumber = (winningNumbers) => {
  return retryUntilValid("보너스 번호를 입력해 주세요.", (bonusNumber) =>
    validateBonusNumber(bonusNumber, winningNumbers)
  );
};

export const getRestart = () =>
  retryUntilValid("다시 시작하시겠습니까? (y/n)", validateRestart);
