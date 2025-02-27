export const LOTTO = {
  RANGE: {
    min: 1,
    max: 45,
  },
  PRIZES: {
    first: 2_000_000_000,
    second: 30_000_000,
    third: 1_500_000,
    fourth: 50_000,
    fifth: 5_000,
  },
  PURCHASE: {
    unit: 1_000,
    maxThreshold: 20_000,
  },
  maxLength: 6,
};

export const MIN_MATCH_COUNT = 3;

export const ERROR_MESSAGE = {
  purchaseUnit: `구입 금액은 ${LOTTO.PURCHASE.unit}원 단위로 입력해주세요.`,
  isNumeric: `숫자를 입력해주세요.`,
  minimumValue: `구입 금액은 ${LOTTO.PURCHASE.unit.toLocaleString()}원 이상이여야 합니다.`,
  maximumValue: `구입 금액은 ${LOTTO.PURCHASE.maxThreshold.toLocaleString()}원 이하여야 합니다.`,
  winningNumberisNumeric: `당첨 번호는 숫자여야 합니다.`,
  lottoNumberRange: `당첨 번호가 ${LOTTO.RANGE.min}부터 ${LOTTO.RANGE.max} 사이의 숫자여야 합니다.`,
  winningNumberDuplicate: "당첨 번호는 중복되지 않아야 합니다",
  bonusNumberUnique: "보너스 번호는 당첨 번호와 중복되면 안됩니다.",
  restartInput: "입력은 y 또는 n만 가능합니다.",
  winningNumbersLength: "당첨 번호는 6개여야 합니다.",
  emptyValue: "빈 값이 들어왔습니다. 값을 입력해주세요",
};
