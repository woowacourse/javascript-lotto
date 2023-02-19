import {
  ERROR_MESSAGE,
  RESPONSE_AFTER_GAME_ENDS,
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
const { RESTART, QUIT } = RESPONSE_AFTER_GAME_ENDS;
const { MIN, MAX } = LOTTO_NUMBER_RANGE;

export const validator = {
  checkPurchaseAmount(purchaseAmount) {
    if (purchaseAmount < LOTTO_PRICE || purchaseAmount % LOTTO_PRICE !== 0) {
      throw new Error(NOT_MULTIPLES_OF_THOUSAND);
    }
  },

  checkInteger(purchaseAmount) {
    if (REGEX_FINDING_NOT_NUMBER.test(purchaseAmount) || purchaseAmount === "") {
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

  checkRestartOrQuitCommend(commend) {
    if (![RESTART, QUIT].includes(String(commend).toLowerCase())) {
      throw new Error(NOT_Y_NOR_N);
    }
  },
};

export const validatePurchaseAmount = (purchaseAmount) => {
  try {
    validator.checkInteger(purchaseAmount);
    validator.checkPurchaseAmount(Number(purchaseAmount));

    return true;
  } catch (error) {
    outputView.print(error.message);

    return false;
  }
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

    return true;
  } catch (error) {
    outputView.print(error.message);

    return false;
  }
};

export const validateBonusNumber = (bonusNumberString, winningLottoNumbers) => {
  try {
    validator.checkInteger(bonusNumberString);

    const bonusNumber = Number(bonusNumberString);

    validator.checkBonusNumberBetween1And45(bonusNumber);
    validator.checkBonusNumberDuplicate(bonusNumber, winningLottoNumbers);

    return true;
  } catch (error) {
    outputView.print(error.message);

    return false;
  }
};

export const validateRestartOrQuitCommend = (commend) => {
  try {
    validator.checkRestartOrQuitCommend(commend);

    return true;
  } catch (error) {
    outputView.print(error.message);
    return false;
  }
};
