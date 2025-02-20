import { retryUntilValidInput } from "../utils/input.js";
import readWinningNumbersInput from "../view/input/readWinningNumbersInput.js";
import validationWinningNumbers from "../validation/validationWinningNumbers.js";
import readBonusNumberInput from "../view/input/readBonusNumberInput.js";
import validationBonusNumber from "../validation/validationBonusNumber.js";

const getWinningNumbersAndBonusNumber = async () => {
  const winningNumbers = await retryUntilValidInput({
    readUserInput: readWinningNumbersInput,
    validator: validationWinningNumbers,
  });

  const bonusNumber = await retryUntilValidInput({
    readUserInput: readBonusNumberInput,
    validator: (bonusNumber) =>
      validationBonusNumber(bonusNumber, winningNumbers),
  });

  return { winningNumbers, bonusNumber };
};

export default getWinningNumbersAndBonusNumber;
