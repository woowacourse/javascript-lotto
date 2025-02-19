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

const validateCount = () => {
    if (value.length !== 6) {
      throw new Error(`은(는) 6개여야 합니다.`);
    }
  };

export { WinningNumbersValidator, validateTypeAll };
