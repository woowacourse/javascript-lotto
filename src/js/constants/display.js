import { LOTTO_MIN_NUMBER, LOTTO_MAX_NUMBER, LOTTO_PRICE } from './lottoRules.js';

export const PURCHASED_QUANTITY_MESSAGE = (numOfLotto) => `총 ${numOfLotto}개를 구매하였습니다.`;
export const PURCHASE_AMOUNT_ALERT_MESSAGE = {
  PURCHASE_AMOUNT_IS_INVALID_MONEY: `화폐단위 미만의 자릿수가 포함된 금액입니다.\n${LOTTO_PRICE}원 단위로 입력해주세요`,
  PURCHASE_AMOUNT_IS_TOO_LOW: `입력된 금액이 로또 한 장의 가격보다 작습니다.\n${LOTTO_PRICE}원 이상의 금액을 입력해주세요`,
  PURCHASE_AMOUNT_HAS_CHANGE: (change) =>
    `입력된 금액에서 ${change}원을 제외한 금액으로 로또를 구매했습니다.\n거스름돈 챙겨가세요.`,
};

export const MANUAL_SELECT_REQUEST_MESSAGE = (num) => `${num}개를 더 골라주세요!`;
export const TICKET_ISSUE_CONFIRM_MESSAGE = ({ auto, manual }) =>
  `자동 ${auto}장, 수동 ${manual}장 으로 로또를 발급합니다.\n확정하시겠습니까?`;

export const LOTTO_NUMBER_SEPARATOR = ', ';

export const WINNING_NUMBER_CHECK_MESSAGE = {
  OUT_OF_RANGE: `${LOTTO_MIN_NUMBER} ~ ${LOTTO_MAX_NUMBER} 범위를 벗어난 값이 있습니다. 확인 후 다시 입력해주세요.`,
  DUPLICATED: '중복된 값이 있습니다. 확인 후 다시 입력해주세요.',
  HAS_BLANK: '아직 입력하지 않은 번호가 있습니다.',
  FULFILLED: '당첨번호 입력이 완료되었습니다. 인생역전의 기회, 지금 결과를 확인하세요!',
};

export const RESULT_TABLE_DISPLAY_KEY = [3, 4, 5, 5.5, 6];
export const RATE_OF_RETURN_DECIMAL_PLACE = 2;
export const RATE_OF_RETURN_MESSAGE = (rateOfReturn) => `당신의 총 수익률은 ${rateOfReturn}%입니다.`;
