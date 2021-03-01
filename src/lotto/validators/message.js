import validator from './validator.js';
import { MESSAGE } from '../../constants.js';

const message = {
  getCostValidation(cost) {
    if (validator.isMoneyLessThanMinCost(cost)) {
      return MESSAGE.SHOULD_EXCEED_MIN_COST;
    }
    if (validator.isChangeMoneyExist(cost)) {
      return MESSAGE.GET_SHOULD_NOT_HAVE_CHANGE_MESSAGE(cost);
    }

    return '';
  },

  getPurchaseAutoCountValidation(purchaseCount, remainCount) {
    if (validator.isPurchaseCountZero(purchaseCount)) {
      return MESSAGE.SHOULD_HAVE_PURCHASE_COUNT;
    }
    if (validator.isExceededRemainCount(purchaseCount, remainCount)) {
      return MESSAGE.GET_SHOULD_FILL_LESS_THAN_REMAIN_COUNT_MESSAGE(
        remainCount,
      );
    }

    return '';
  },

  getCorrectNumberValidation(correctNumbers) {
    if (validator.isDuplicatedNumberExist(correctNumbers)) {
      return MESSAGE.DUPLICATED_NUMBER_EXIST;
    }
    if (validator.isNumberOutOfRangeExist(correctNumbers)) {
      return MESSAGE.NUMBER_RANGE_EXCEEDED;
    }

    return '';
  },

  getModalOpenValidation(correctNumbers) {
    if (validator.isEmptyCorrectNumberExist(correctNumbers)) {
      return MESSAGE.SHOULD_FILL_ALL_WINNING_NUMBERS;
    }

    return '';
  },

  getPurchaseManualLottoValidation(lottoNumbers) {
    if (validator.isEmptyLottoNumberExist(lottoNumbers)) {
      return MESSAGE.SHOULD_FILL_ALL_LOTTO_NUMBERS;
    }
  },
};

export default message;
