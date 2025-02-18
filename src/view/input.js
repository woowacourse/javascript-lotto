import validatePrice from "../domain/validatePrice.js";
import validateWinningNumbers from "../domain/validateWinningNumbers.js";
import retryUntilValid from "../utils/retryUntilValid.js";

export const getLottoPrice = () =>
  retryUntilValid("구입금액을 입력해 주세요.", validatePrice);

export const getWinningNumbers = () =>
  retryUntilValid("당첨 번호를 입력해 주세요.", validateWinningNumbers);
