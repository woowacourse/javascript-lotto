import SYSTEM_MESSAGE from "../lottoConstants/systemMessage.js";
import validatePrice from "../validation/validatePrice.js";
import validateWinningNumber from "../validation/validateWinningNumber.js";
import validateBonusNumber from "../validation/validateBonusNumber.js";
import InputView from "../view/inputView.js";
import { parseBonusNumber, parsePrice, parseWinningNumbers } from "./ParsingService.js";
import validateRetryInput from "../validation/validateRetryInput.js";

export const getPrice = async () => {
  const priceInput = await InputView.readUserInput(SYSTEM_MESSAGE.PRICE, "price-input");
  validatePrice(priceInput);
  return parsePrice(priceInput);
};

export const getWinningNumber = async () => {
  const isMultipleValue = true;
  const winningNumberInput = await InputView.readUserInput(SYSTEM_MESSAGE.WINNING_NUMBER, "winning-number", isMultipleValue);
  validateWinningNumber(winningNumberInput);
  return parseWinningNumbers(winningNumberInput);
};

export const getBonusNumber = async (winningNumbers) => {
  const bonusNumberInput = await InputView.readUserInput(SYSTEM_MESSAGE.BONUS_NUMBER, "bonus-number");
  validateBonusNumber(winningNumbers, bonusNumberInput);
  return parseBonusNumber(bonusNumberInput);
};

export const getRetryInput = async () => {
  const retryInput = await InputView.readUserInput(SYSTEM_MESSAGE.RETRY, "retry-input");
  validateRetryInput(retryInput);
  return retryInput;
};
