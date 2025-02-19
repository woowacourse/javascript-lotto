import { validateType } from "./validate";

const WinningNumbersValidator = {
  validate: (winningNumbers) => {
    validateTypeAll(winningNumbers);
  },
};

const validateTypeAll = (winningNumbers) => {
  winningNumbers.forEach((number) => {
    validateType("당첨 번호", number);
  });
};

export { WinningNumbersValidator, validateTypeAll };
