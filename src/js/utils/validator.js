import { ERROR_MESSAGE } from "./constants.js";

export const isDividedByThousand = (purchaseMoney) => {
  if (purchaseMoney % 1000 !== 0) {
    throw ERROR_MESSAGE.NOT_VALIDE_UNIT_PURCHASE_MONEY;
  }
};

export const isEmptyValue = (purchaseMoney) => {
  if (!purchaseMoney) {
    throw ERROR_MESSAGE.EMPTY_PURCHASE_MONEY;
  }
};

export const isPositiveValue = (purchaseMoney) => {
  if (purchaseMoney <= 0) {
    throw ERROR_MESSAGE.NOT_VALID_PURCHASE_MONEY;
  }
};

export const isMaxPurchaseLotto = (purchaseMoney) => {
  if (purchaseMoney > 5000) {
    throw ERROR_MESSAGE.MORE_THAN_MAX_COST;
  }
}

export const userLottoNumberOverlap = (lottoNumbers) => {
  const lottoSet = new Set();
  lottoNumbers.map((number) => lottoSet.add(number));
  if (lottoSet.size !== lottoNumbers.length) {
    throw ERROR_MESSAGE.USER_LOTTO_NUMBER_OVERLAP;
  }
}

export const userLottoNumberCorrectRange = (lottoNumbers) => {
  if (lottoNumbers.filter((number) => number > 45 || number < 1).length > 0) {
    throw ERROR_MESSAGE.USER_LOTTO_NUMBER_CORRECT_RANGE;
  }
}

export const userLottoNumberPositiveValue = (lottoNumbers) => {
  if (lottoNumbers.filter((number) => !number).length > 0) {
    throw ERROR_MESSAGE.USER_LOTTO_NUMBER_POSITIVE_VALUE;
  }
}

export const isNotPurchaseLotto = (lottoList) => {
  if (lottoList.length === 0) {
    throw ERROR_MESSAGE.NOT_YET_PURCHASE_LOTTO;
  }
} 
