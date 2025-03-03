import SYSTEM_MESSAGE from "../../common/lottoConstants/systemMessage.js";
import validateBonusNumber from "../../common/validation/validateBonusNumber.js";
import validatePrice from "../../common/validation/validatePrice.js";
import validateRetryInput from "../../common/validation/validateRetryInput.js";
import validateWinningNumber from "../../common/validation/validateWinningNumber.js";
import InputView from "../view/InputView.js";
import { parseBonusNumber, parsePrice, parseWinningNumbers } from "../../common/service/ParsingService.js";

export const getPrice = async () => {
  const priceInput = await InputView.readUserInput(SYSTEM_MESSAGE.PRICE);
  validatePrice(priceInput);
  return parsePrice(priceInput);
};

export const getWinningNumber = async () => {
  const isMultipleValue = true;
  const winningNumberInput = await InputView.readUserInput(SYSTEM_MESSAGE.WINNING_NUMBER);
  validateWinningNumber(winningNumberInput);
  return parseWinningNumbers(winningNumberInput);
};

export const getBonusNumber = async (winningNumbers) => {
  const bonusNumberInput = await InputView.readUserInput(SYSTEM_MESSAGE.BONUS_NUMBER);
  validateBonusNumber(winningNumbers, bonusNumberInput);
  return parseBonusNumber(bonusNumberInput);
};

export const getRetryInput = async () => {
  const retryInput = await InputView.readUserInput(SYSTEM_MESSAGE.RETRY);
  validateRetryInput(retryInput);
  return retryInput;
};
