import { $ } from '../utils/dom.js';
import { LOTTO_PRICE } from '../constants/constant.js';
import { NOT_DIVIDE_THOUSAND_ERROR } from '../constants/errorMessage.js';
import {
  isValueTypeNumber,
  isPositiveNumber,
} from '../modules/checkInputValue.js';

export const getLottoPrice = () => {
  const lottoPrice = $('.lotto-price-input').value;
  return lottoPrice;
};

export const checkLottoPrice = userInput => {
  const lottoPrice = Number(userInput);
  try {
    let userLottoPriceInputPositive = false;
    if (isValueTypeNumber(lottoPrice)) {
      userLottoPriceInputPositive = isPositiveNumber(lottoPrice);
    }
    if (userLottoPriceInputPositive) {
      isValueDivideThousand(lottoPrice);
    }
    return lottoPrice;
  } catch (err) {
    window.alert('로또 구입 금액에는 ' + err.message);
  }
};

export const isValueDivideThousand = value => {
  if (value % LOTTO_PRICE === 0) {
    return true;
  }
  throw new Error(NOT_DIVIDE_THOUSAND_ERROR);
};
