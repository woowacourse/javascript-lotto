import { outputView } from "../view/outputView";

export const validator = {
  checkPurchaseAmount(purchaseAmount) {
    if (purchaseAmount < 1000 || purchaseAmount % 1000 !== 0) {
      throw new Error("[ 에러 ] 1,000원 단위로 입력해 주세요.");
    }
  },

  checkInteger(purchaseAmountString) {
    if (/[^0-9]/.test(purchaseAmountString) || purchaseAmountString === "") {
      throw new Error("[ 에러 ] 정수를 입력해 주세요.");
    }
  },

  checkDuplicates(winningLottoNumbers) {
    if (new Set(winningLottoNumbers).size !== winningLottoNumbers.length) {
      throw new Error("[ 에러 ] 번호 중복 없이 입력해 주세요.");
    }
  },

  checkLottoNumbersBetween1And45(winningLottoNumbers) {
    if (!winningLottoNumbers.every((number) => number >= 1 && number <= 45)) {
      throw new Error("[ 에러 ] 1 ~ 45 사이의 숫자를 입력해 주세요.");
    }
  },

  checkListLengthIsSix(winningLottoNumbers) {
    if (winningLottoNumbers.length !== 6) {
      throw new Error("[ 에러 ] 6개의 로또 번호를 입력해 주세요.");
    }
  },

  checkBonusNumberDuplicate(bonusNumber, winningLottoNumbers) {
    if (winningLottoNumbers.includes(bonusNumber)) {
      throw new Error("[ 에러 ] 로또 번호와 중복되지 않게 보너스 번호를 입력해 주세요.");
    }
  },

  checkBonusNumberBetween1And45(bonusNumber) {
    if (!(bonusNumber >= 1 && bonusNumber <= 45)) {
      throw new Error("[ 에러 ] 1 ~ 45 사이의 숫자를 입력해 주세요.");
    }
  },

  checkYOrN(yOrN) {
    if (!["y", "Y", "n", "N"].includes(yOrN)) {
      throw new Error("[ 에러 ] 대, 소문자 Y/y 또는 N/n을 입력해 주세요.");
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
