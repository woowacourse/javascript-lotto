import { LOTTO_PRICE } from "./constants";
import { MESSAGE } from "./message";

const checkPurchaseAmount = (purchaseAmount) => {
  if (purchaseAmount < LOTTO_PRICE || purchaseAmount % LOTTO_PRICE !== 0) {
    throw new Error(MESSAGE.ERROR.inputLottoPrice);
  }
};

const checkInteger = (purchaseAmountString) => {
  if (/[^0-9]/.test(purchaseAmountString) || purchaseAmountString === "") {
    throw new Error(MESSAGE.ERROR.inputInteger);
  }
};

const checkDuplicates = (winningLottoNumbers) => {
  if (new Set(winningLottoNumbers).size !== winningLottoNumbers.length) {
    throw new Error(MESSAGE.ERROR.inputNotDupicatedLottoNumber);
  }
};

const checkLottoNumbersBetween1And45 = (winningLottoNumbers) => {
  if (!winningLottoNumbers.every((number) => number >= 1 && number <= 45)) {
    throw new Error(MESSAGE.ERROR.inputBetween1And45);
  }
};

const checkListLengthIsSix = (winningLottoNumbers) => {
  if (winningLottoNumbers.length !== 6) {
    throw new Error(MESSAGE.ERROR.inputSixLottoNumbers);
  }
};

const checkBonusNumberDuplicate = (bonusNumber, winningLottoNumbers) => {
  if (winningLottoNumbers.includes(bonusNumber)) {
    throw new Error(MESSAGE.ERROR.inputNotDupicatedBonusNumber);
  }
};

const checkBonusNumberBetween1And45 = (bonusNumber) => {
  if (!(bonusNumber >= 1 && bonusNumber <= 45)) {
    throw new Error(MESSAGE.ERROR.inputBetween1And45);
  }
};
const checkYOrN = (yOrN) => {
  if (!["y", "Y", "n", "N"].includes(yOrN)) {
    throw new Error(MESSAGE.ERROR.inputRestartOrQuitCharacter);
  }
};

export const validatePurchaseAmount = (purchaseAmountString) => {
  checkInteger(purchaseAmountString);
  checkPurchaseAmount(Number(purchaseAmountString));
};

export const validateWinningLottoNumbers = (winningLottoNumbers) => {
  winningLottoNumbers.split(",").forEach((winningLottoNumber) => checkInteger(winningLottoNumber));

  const mappedWinningLottoNumbers = winningLottoNumbers.split(",").map(Number);

  checkDuplicates(mappedWinningLottoNumbers);
  checkLottoNumbersBetween1And45(mappedWinningLottoNumbers);
  checkListLengthIsSix(mappedWinningLottoNumbers);
};

export const validateBonusNumber = (bonusNumber, winningLottoNumbers) => {
  checkInteger(bonusNumber);

  const convertedbonusNumber = Number(bonusNumber);

  checkBonusNumberBetween1And45(convertedbonusNumber);
  checkBonusNumberDuplicate(convertedbonusNumber, winningLottoNumbers);
};

export const validateRestartOrQuitCommend = (restartOrQuit) => {
  checkYOrN(restartOrQuit);
};
