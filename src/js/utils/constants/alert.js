import { LOTTO_SETTINGS } from './settings.js';

export const ALERT_MESSAGES = {
  UNDER_MIN_PRICE: `최소 ${LOTTO_SETTINGS.LOTTO_PRICE}원 이상의 금액을 입력해야 합니다.`,
  DUPLICATED_NUMBERS_EXIST: '로또 번호에 중복이 있습니다.',
  CANT_BUY_AMOUNT: '지불하신 금액에 비해 로또 구매 수량이 많습니다.',
  UNDER_MIN_AMOUNT_TO_BUY: `구매하시는 총 로또의 갯수는 최소 ${LOTTO_SETTINGS.MIN_AMOUNT_TO_BUY}개 이상이어야합니다.`,
}
