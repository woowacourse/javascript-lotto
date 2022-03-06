import { LOTTO_PRICE, MAX_PURCHASABLE_CASH } from './lotto';

export const ALERT_MESSAGE = {
  NOT_DIVISIBLE: `${LOTTO_PRICE.toLocaleString()}으로 나누어떨어지는 금액을 입력해주세요.`,
  DUPLICATED_NUMBER: '당첨 번호가 서로 중복되지 않게 입력해주세요.',
  OVER_MAX_CASH: `최대 ${MAX_PURCHASABLE_CASH.toLocaleString()}원까지 구매 가능합니다.`,
};
