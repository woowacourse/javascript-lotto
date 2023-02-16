import {
  ERROR_MESSAGE,
  RESTART_COMMEND,
  LOTTO_NUMBER_RANGE,
  LOTTO_PRICE,
  LOTTO_NUMBER_LENGTH,
  REGEX_FINDING_NOT_NUMBER,
} from "../constants";
import { outputView } from "../view/outputView";

const {
  NOT_MULTIPLES_OF_THOUSAND,
  NOT_INTEGER,
  NOT_BETWEEN_ONE_AND_FORTYFIVE,
  DUPLICATED_LOTTO_NUMBER,
  NOT_SIX,
  DUPLICATED_BONUS_NUMBER,
  NOT_Y_NOR_N,
} = ERROR_MESSAGE;
const { LOWER_CASE_Y, UPPER_CASE_Y, LOWER_CASE_N, UPPER_CASE_N } = RESTART_COMMEND;
const { MIN, MAX } = LOTTO_NUMBER_RANGE;

export const validator = {
  checkPurchaseAmount(purchaseAmount) {
    if (purchaseAmount < LOTTO_PRICE || purchaseAmount % LOTTO_PRICE !== 0) {
      throw new Error(NOT_MULTIPLES_OF_THOUSAND);
    }
  },

  checkInteger(purchaseAmountString) {
    if (REGEX_FINDING_NOT_NUMBER.test(purchaseAmountString) || purchaseAmountString === "") {
      throw new Error(NOT_INTEGER);
    }
  },

  checkDuplicates(winningLottoNumbers) {
    if (new Set(winningLottoNumbers).size !== winningLottoNumbers.length) {
      throw new Error(DUPLICATED_LOTTO_NUMBER);
    }
  },

  checkLottoNumbersBetween1And45(winningLottoNumbers) {
    if (!winningLottoNumbers.every((number) => number >= MIN && number <= MAX)) {
      throw new Error(NOT_BETWEEN_ONE_AND_FORTYFIVE);
    }
  },

  checkListLengthIsSix(winningLottoNumbers) {
    if (winningLottoNumbers.length !== LOTTO_NUMBER_LENGTH) {
      throw new Error(NOT_SIX);
    }
  },

  checkBonusNumberDuplicate(bonusNumber, winningLottoNumbers) {
    if (winningLottoNumbers.includes(bonusNumber)) {
      throw new Error(DUPLICATED_BONUS_NUMBER);
    }
  },

  checkBonusNumberBetween1And45(bonusNumber) {
    if (!(bonusNumber >= MIN && bonusNumber <= MAX)) {
      throw new Error(NOT_BETWEEN_ONE_AND_FORTYFIVE);
    }
  },

  checkYOrN(yOrN) {
    if (![LOWER_CASE_Y, UPPER_CASE_Y, LOWER_CASE_N, UPPER_CASE_N].includes(yOrN)) {
      throw new Error(NOT_Y_NOR_N);
    }
  },
};

export const validatePurchaseAmount = (purchaseAmountString) => {
  try {
    validator.checkInteger(purchaseAmountString);
    validator.checkPurchaseAmount(Number(purchaseAmountString));
  } catch (error) {
    outputView.print(error.message);
    return false;
  }
  return true;
};

export const validateWinningLottoNumbers = (winningLottoNumberStrings) => {
  try {
    winningLottoNumberStrings.forEach((winningLottoNumber) =>
      validator.checkInteger(winningLottoNumber)
    );

    const winningLottoNumbers = winningLottoNumberStrings.map((number) => Number(number));

    validator.checkDuplicates(winningLottoNumbers);
    validator.checkLottoNumbersBetween1And45(winningLottoNumbers);
    validator.checkListLengthIsSix(winningLottoNumbers);
  } catch (error) {
    outputView.print(error.message);
    return false;
  }
  return true;
};

export const validateBonusNumber = (bonusNumberString, winningLottoNumbers) => {
  try {
    validator.checkInteger(bonusNumberString);

    const bonusNumber = Number(bonusNumberString);

    validator.checkBonusNumberBetween1And45(bonusNumber);
    validator.checkBonusNumberDuplicate(bonusNumber, winningLottoNumbers);
  } catch (error) {
    outputView.print(error.message);
    return false;
  }
  return true;
};

export const validateRestartOrQuitCommend = (restartOrQuit) => {
  try {
    validator.checkYOrN(restartOrQuit);
  } catch (error) {
    outputView.print(error.message);
    return false;
  }
  return true;
};
