import { validateRange, validateType } from "./validate.js";

const BonusNumberValidator = {
  validate: (bonusNumber, winningNumbers) => {
    validateType("보너스 번호", bonusNumber);
    validateRange({
      key: "보너스 번호",
      value: bonusNumber,
      min: 1,
      max: 45,
    });
    validateDuplicate(bonusNumber, winningNumbers);
  },
};

const validateDuplicate = (bonusNumber, winningNumbers) => {
  if (winningNumbers.includes(bonusNumber)) {
    throw new Error("보너스 번호는 당첨 번호와 중복될 수 없습니다.");
  }
};

export { BonusNumberValidator, validateDuplicate };
