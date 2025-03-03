import { parseBonusNumber, parsePrice, parseWinningNumbers } from "../../common/service/ParsingService.js";
import validateBonusNumber from "../../common/validation/validateBonusNumber.js";
import validatePrice from "../../common/validation/validatePrice.js";
import validateWinningNumber from "../../common/validation/validateWinningNumber.js";
import { InputUtil } from "../util/InputUtil.js";

export const getPrice = () => {
  const priceInput = InputUtil.readInput("price");
  validatePrice(priceInput);
  return parsePrice(priceInput);
};

export const getWinningNumber = () => {
  const winningNumberInput = InputUtil.readInputs("winning-number");
  validateWinningNumber(winningNumberInput);
  return parseWinningNumbers(winningNumberInput);
};

export const getBonusNumber = (winningNumbers) => {
  const bonusNumberInput = InputUtil.readInputs("bonus-number");
  validateBonusNumber(winningNumbers, bonusNumberInput);
  return parseBonusNumber(bonusNumberInput);
};
