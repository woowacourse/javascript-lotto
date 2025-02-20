import {
  BONUS_NUMBER_ERROR_MESSAGES,
  MIN_LOTTO_NUMBER,
  MAX_LOTTO_NUMBER,
} from "../constants/constants.js";
import throwIfInvalid from "../utils/throwIfInvalid.js";

const checkIsNumber = (bonusNumber) => {
  throwIfInvalid(
    Number.isNaN(bonusNumber),
    BONUS_NUMBER_ERROR_MESSAGES.NOT_A_NUMBER,
  );
};

const checkIsInteger = (bonusNumber) => {
  throwIfInvalid(
    !Number.isInteger(bonusNumber),
    BONUS_NUMBER_ERROR_MESSAGES.NOT_AN_INTEGER,
  );
};

const checkIsInRange = (bonusNumber) => {
  throwIfInvalid(
    MIN_LOTTO_NUMBER > bonusNumber || MAX_LOTTO_NUMBER < bonusNumber,
    BONUS_NUMBER_ERROR_MESSAGES.OUT_OF_RANGE,
  );
};

const checkIsNotDuplicate = (winningNumbers, bonusNumber) => {
  throwIfInvalid(
    winningNumbers.includes(bonusNumber),
    BONUS_NUMBER_ERROR_MESSAGES.DUPLICATE_NUMBER,
  );
};

const validateBonusNumber = (input, winningNumbers) => {
  const bonusNumber = Number(input);

  checkIsNumber(bonusNumber);
  checkIsInteger(bonusNumber);
  checkIsInRange(bonusNumber);
  checkIsNotDuplicate(winningNumbers, bonusNumber);

  return bonusNumber;
};

export default validateBonusNumber;
