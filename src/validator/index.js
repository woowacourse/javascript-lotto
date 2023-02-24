import {
  ERROR_MESSAGE,
  RESPONSE_AFTER_GAME_ENDS,
  LOTTO_NUMBER_RANGE,
  LOTTO_PRICE_UNIT,
  LOTTO_NUMBER_LENGTH,
  REGEX_FINDING_NOT_NUMBER,
} from "../constants";

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

export const validatePurchaseAmount = (purchaseAmount) => {
  validator.checkInteger(purchaseAmount);
  validator.checkPurchaseAmount(purchaseAmount);
};

export const validateWinningLottoNumbers = (winningLottoNumber) => {
  winningLottoNumber.forEach((winningLottoNumber) => validator.checkInteger(winningLottoNumber));

  validator.checkDuplicates(winningLottoNumber);
  validator.checkLottoNumbersBetween1And45(winningLottoNumber);
  validator.checkListLengthIsSix(winningLottoNumber);
};

export const validateBonusNumber = (bonusNumber, winningLottoNumbers) => {
  validator.checkInteger(bonusNumber);
  validator.checkBonusNumberBetween1And45(bonusNumber);
  validator.checkBonusNumberDuplicate(bonusNumber, winningLottoNumbers);
};

export const validateRestartOrQuitCommend = (commend) => {
  validator.checkRestartOrQuitCommend(commend);
};

export const validator = {
  checkPurchaseAmount(purchaseAmount) {
    if (purchaseAmount < LOTTO_PRICE_UNIT || purchaseAmount % LOTTO_PRICE_UNIT !== 0) {
      throw new Error(NOT_MULTIPLES_OF_THOUSAND);
    }
  },

  checkInteger(number) {
    if (REGEX_FINDING_NOT_NUMBER.test(number) || number === "") {
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
    if (winningLottoNumbers.includes(Number(bonusNumber))) {
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
