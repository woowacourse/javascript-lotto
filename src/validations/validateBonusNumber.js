import {
  LOTTO_NUMBER_MAX,
  LOTTO_NUMBER_MIN,
} from "../constants/validateConstants.js";
import { BONUS_NUMBER_ERROR_MESSAGES } from "../constants/errorConstants.js";
import throwIfInvalid from "../utils/throwIfInvalid.js";

const checkIsNumber = (bonusNumber) => {
  throwIfInvalid(
    Number.isNaN(bonusNumber),
    BONUS_NUMBER_ERROR_MESSAGES.NOT_A_NUMBER
  );
};

const checkIsInteger = (bonusNumber) => {
  throwIfInvalid(
    !Number.isInteger(bonusNumber),
    BONUS_NUMBER_ERROR_MESSAGES.NOT_AN_INTEGER
  );
};

const checkIsInRange = (bonusNumber) => {
  throwIfInvalid(
    LOTTO_NUMBER_MIN > bonusNumber || LOTTO_NUMBER_MAX < bonusNumber,
    BONUS_NUMBER_ERROR_MESSAGES.OUT_OF_RANGE
  );
};

const checkIsNotDuplicate = (winningNumbers, bonusNumber) => {
  throwIfInvalid(
    winningNumbers.includes(bonusNumber),
    BONUS_NUMBER_ERROR_MESSAGES.DUPLICATE_NUMBER
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
