import ERROR_MESSAGE from "../../constants/ERROR_MESSAGE.js";
import Parser from "../../utils/Parser.js";
import Validator from "../../utils/Validator.js";

const parseAndValidateBonusNumber = (winningNumbers) => {
  return (bonusNumberInput) => {
    const bonusNumber = parseBonusNumber(bonusNumberInput);
    validateBonusNumber(winningNumbers, bonusNumber);

    return bonusNumber;
  };
};
export default parseAndValidateBonusNumber;

const validateBonusNumber = (winningNumbers, bonusNumber) => {
  if (Validator.isEmpty(bonusNumber)) throw new Error(ERROR_MESSAGE.INVALID_BONUS_NUMBER_TYPE);
  if (Validator.isBonusNumberRange(bonusNumber)) throw new Error(ERROR_MESSAGE.INVALID_BONUS_NUMBER_RANGE);
  if (Validator.isIncludeNumber(winningNumbers, bonusNumber)) throw new Error(ERROR_MESSAGE.DUPLICATE_BONUS_NUMBER);
};

const parseBonusNumber = (input) => {
  return Parser.number(input);
};
