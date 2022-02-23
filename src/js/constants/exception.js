const EXCEPTION = Object.freeze({
  INVALID_RANGE: {
    MINIMUM: '1000원 이상의 금액이 투입되어야 합니다.',
    MAXIMUM:
      '너무 큰 돈을 입력하셨습니다. 1,000,000원 이하의 금액이 투입되어야 합니다.',
  },
  INVALID_UNIT: '1000원 단위의 금액이 투입되어야 합니다.',
});

export default EXCEPTION;
