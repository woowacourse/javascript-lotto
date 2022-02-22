import { $ } from '../utils/dom.js';
import { LOTTO_PRICE } from '../constants/constant.js';
import {
  NOT_DIVIDE_THOUSAND_ERROR,
  NOT_NUMBER_TYPE_ERROR,
  NOT_POSITIVE_NUMBER_ERROR,
} from '../constants/errorMessage.js';

export const getLottoPrice = () => {
  const lottoPrice = $('.lotto-price-input').value;
  return lottoPrice;
};

export const checkLottoPrice = userInput => {
  const lottoPrice = Number(userInput);
  if (isValueTypeNumber(lottoPrice) === false) {
    window.alert(NOT_NUMBER_TYPE_ERROR);
    return;
  }
  if (isValuePositiveNumber(lottoPrice) === false) {
    window.alert(NOT_POSITIVE_NUMBER_ERROR);
    return;
  }
  if (isValueDivideThousand(lottoPrice) === false) {
    window.alert(NOT_DIVIDE_THOUSAND_ERROR);
    return;
  }
  return lottoPrice;
};

export const isValueTypeNumber = value => {
  return Number.isInteger(value);
};

export const isValuePositiveNumber = value => {
  return value > 0;
};

export const isValueDivideThousand = value => {
  return value % LOTTO_PRICE === 0;
};
