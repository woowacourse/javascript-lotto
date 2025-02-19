import { validateRange, validateType } from "./validate";

const BonusNumberValidator = {
  validate: (bonusNumber, winningNumbers) => {
    validateType(bonusNumber);
    validateRange(bonusNumber);
    validateDuplicate(bonusNumber, winningNumbers);
  },
};

const validateDuplicate = (bonusNumber, winningNumbers) => {
  if (winningNumbers.includes(bonusNumber)) {
    throw new Error("보너스 번호는 당첨 번호와 중복될 수 없습니다.");
  }
};

export { BonusNumberValidator, validateDuplicate };
