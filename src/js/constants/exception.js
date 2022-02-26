import LOTTO from './lotto';

const EXCEPTION = Object.freeze({
  INVALID_RANGE: {
    MINIMUM: `${LOTTO.PRICE_PER_TICKET} 이상의 금액이 투입되어야 합니다.`,
    MAXIMUM:
      '너무 큰 돈을 입력하셨습니다. 1,000,000원 이하의 금액이 투입되어야 합니다.',
  },
  INVALID_UNIT: `${LOTTO.PRICE_PER_TICKET}  단위의 금액이 투입되어야 합니다.`,
});

export default EXCEPTION;
