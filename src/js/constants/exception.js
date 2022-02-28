import LOTTO from './lotto.js';
import autoComma from '../utils/autoComma.js';

const EXCEPTION = Object.freeze({
  INVALID_RANGE: {
    MINIMUM: `${autoComma(LOTTO.PRICE_PER_TICKET)}원 이상의 금액이 투입되어야 합니다.`,
    MAXIMUM:
      `너무 큰 돈을 입력하셨습니다. ${autoComma(LOTTO.PRICE_PER_TICKET * LOTTO.INVENTORY)}원 이하의 금액이 투입되어야 합니다.`,
  },
  INVALID_UNIT: `${autoComma(LOTTO.PRICE_PER_TICKET)}원 단위의 금액이 투입되어야 합니다.`,
});

export default EXCEPTION;
