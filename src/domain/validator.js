import { outputView } from "../view/outputView";
import { LOTTO_PRICE } from "./constants";
import { MESSAGE } from "./message";
export const validator = {
  checkPurchaseAmount(purchaseAmount) {
    if (purchaseAmount < LOTTO_PRICE || purchaseAmount % LOTTO_PRICE !== 0) {
      throw new Error(MESSAGE.ERROR.inputLottoPrice);
    }
  },

  checkInteger(purchaseAmountString) {
    if (/[^0-9]/.test(purchaseAmountString) || purchaseAmountString === "") {
      throw new Error(MESSAGE.ERROR.inputInteger);
    }
  },

  checkDuplicates(winningLottoNumbers) {
    if (new Set(winningLottoNumbers).size !== winningLottoNumbers.length) {
      throw new Error(MESSAGE.ERROR.inputNotDupicatedLottoNumber);
    }
  },

  checkLottoNumbersBetween1And45(winningLottoNumbers) {
    if (!winningLottoNumbers.every((number) => number >= 1 && number <= 45)) {
      throw new Error(MESSAGE.ERROR.inputBetween1And45);
    }
  },

  checkListLengthIsSix(winningLottoNumbers) {
    if (winningLottoNumbers.length !== 6) {
      throw new Error(MESSAGE.ERROR.inputSixLottoNumbers);
    }
  },

  checkBonusNumberDuplicate(bonusNumber, winningLottoNumbers) {
    if (winningLottoNumbers.includes(bonusNumber)) {
      throw new Error(MESSAGE.ERROR.inputNotDupicatedBonusNumber);
    }
  },

  checkBonusNumberBetween1And45(bonusNumber) {
    if (!(bonusNumber >= 1 && bonusNumber <= 45)) {
      throw new Error(MESSAGE.ERROR.inputBetween1And45);
    }
  },

  checkYOrN(yOrN) {
    if (!["y", "Y", "n", "N"].includes(yOrN)) {
      throw new Error(MESSAGE.ERROR.inputRestartOrQuitCharacter);
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
