import { validateType, validateRange } from "./validate";

const WinningNumbersValidator = {
  validate: (winningNumbers) => {
    validateTypeAll(winningNumbers);
    validateCount(winningNumbers);
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
