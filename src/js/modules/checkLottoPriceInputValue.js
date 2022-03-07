import { $ } from '../utils/dom.js';
import { LOTTO_INFO } from '../constants/constant.js';
import { NOT_DIVIDE_THOUSAND_ERROR } from '../constants/errorMessage.js';
import { isValueTypeNumber, isPositiveNumber } from './checkInputValue.js';

export const getLottoPrice = () => {
  const lottoPrice = $('.lotto-price-input').value;
  if (checkLottoPrice(lottoPrice)) {
    return lottoPrice;
  }
  return false;
};

export const checkLottoPrice = userInput => {
  const lottoPrice = Number(userInput);
  try {
    let userLottoPriceInputPositive = false;
    if (isValueTypeNumber(lottoPrice)) {
      userLottoPriceInputPositive = isPositiveNumber(lottoPrice);
    }
    if (userLottoPriceInputPositive) {
      return isValueDivideThousand(lottoPrice);
    }
    return userLottoPriceInputPositive;
  } catch (err) {
    window.alert('로또 구입 금액에는 ' + err.message);
  }
};

export const isValueDivideThousand = value => {
  if (value % LOTTO_INFO.LOTTO_PRICE === 0) {
    return true;
  }
  throw new Error(NOT_DIVIDE_THOUSAND_ERROR);
};
