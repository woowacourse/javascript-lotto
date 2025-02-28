import validatePrice from "../validations/validatePrice.js";
import validateRestart from "../validations/validateRestart.js";
import {
  validateBonusNumber,
  validateWinningNumbers,
} from "../validations/validateWinningNumbers.js";
import retryUntilValid from "../utils/retryUntilValid.js";
import readLineAsync from "../utils/readLineAsync.js";
import { printError } from "./output.js";

export const getInput = async (promptMessage, validateFunc) => {
  const input = await readLineAsync(promptMessage);
  return validateFunc(input);
};

export const getLottoPrice = async () =>
  retryUntilValid(
    () => getInput("구입금액을 입력해 주세요. ", validatePrice),
    printError
  );

export const getWinningNumbers = () =>
  retryUntilValid(
    () => getInput("\n당첨 번호를 입력해 주세요. ", validateWinningNumbers),
    printError
  );

export const getBonusNumber = (winningNumbers) =>
  retryUntilValid(
    () =>
      getInput("\n보너스 번호를 입력해 주세요. ", (bonusNumber) =>
        validateBonusNumber(bonusNumber, winningNumbers)
      ),
    printError
  );

export const getRestart = () =>
  retryUntilValid(
    () => getInput("\n다시 시작하시겠습니까? (y/n) ", validateRestart),
    printError
  );
