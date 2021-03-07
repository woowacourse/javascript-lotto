import { LOTTO_SETTINGS } from './settings.js';

export const ALERT_MESSAGES = {
  UNDER_MIN_PRICE: `최소 ${LOTTO_SETTINGS.LOTTO_PRICE}원 이상의 금액을 입력해야 합니다.`,
  DUPLICATED_NUMBERS_EXIST: '로또 번호에 중복이 있습니다.',
  CANT_BUY_AMOUNT: '지불 금액으로 구매하실 수 있는 로또 갯수보다 많습니다.',
  UNDER_MIN_AMOUNT_TO_BUY: `구매하시는 총 로또의 갯수는 최소 ${LOTTO_SETTINGS.MIN_AMOUNT_TO_BUY}개 이상이어야합니다.`,
}
