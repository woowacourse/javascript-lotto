import Validate from "./Validate.js";

const validate = new Validate();

const validateRestart = (input) => {
  validate.restartInput(input);
};

const validateBonusNumber = (winningNumber, bonusNumber) => {
  validate.isNumeric(bonusNumber);
  validate.lottoNumberRange(bonusNumber);
  validate.bonusNumberUnique(winningNumber, bonusNumber);
};

const validatePrice = (price) => {
  validate.emptyValue(price);
  validate.isNumeric(price);
  validate.minimumValue(price);
  validate.purchaseUnit(price);
  validate.maximumValue(price);
};

const validateWinningNumbers = (winningNumbers) => {
  winningNumbers.forEach((number) => {
    validate.emptyValue(number);
    validate.isNumeric(number);
    validate.lottoNumberRange(number);
  });
  validate.winningNumberDuplicate(winningNumbers);
  validate.winningNumbersLength(winningNumbers);
};

export {
  validateRestart,
  validateBonusNumber,
  validatePrice,
  validateWinningNumbers,
};
