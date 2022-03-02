import LOTTO from './lotto';

const EXCEPTION = Object.freeze({
  INVALID_RANGE: {
    MINIMUM: `${LOTTO.PRICE_PER_TICKET}원 이상의 금액이 투입되어야 합니다.`,
    MAXIMUM:
      '너무 큰 돈을 입력하셨습니다. 1,000,000원 이하의 금액이 투입되어야 합니다.',
  },
  INSUFFICIENT: {
    PURCHASE_INPUT:
      '아직 로또를 구입하지 않으셨습니다. 먼저 로또를 구입해주세요',
  },
});

export default EXCEPTION;
