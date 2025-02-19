import { validateType, validateRange, validateCount } from "./validate.js";

const WinningNumbersValidator = {
  validate: (winningNumbers) => {
    validateTypeAll(winningNumbers);
    validateCount("당첨 번호", winningNumbers);
    validateRangeAll(winningNumbers);
  },
};

const validateTypeAll = (winningNumbers) => {
  winningNumbers.forEach((number) => {
    validateType("당첨 번호", number);
  });
};

const validateRangeAll = (winningNumbers) => {
  winningNumbers.forEach((number) => {
    validateRange({
      key: "당첨 번호",
      value: number,
      min: 1,
      max: 45,
    });
  });
};

export { WinningNumbersValidator, validateTypeAll, validateRangeAll };
