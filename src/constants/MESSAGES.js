const ERROR = {
  invalidRetryChecker:
    "[ERROR] 유효하지 않은 재시작 옵션입니다. (y/n 중 선택해주세요)",
  notInLottoNumberRange: "[ERROR] 유효한 범위 로또 숫자가 아닙니다.",
  hasDuplicateElements: "[ERROR] 중복된 요소가 포합됩니다.",
  nonNegativeIntegerString:
    "[ERROR] 10진수 양의 정수로 변환되는 숫자가 아닙니다",
  invalidLottoNumbersLength: "[ERROR] 유효한 개수의 로또 숫자가 아닙니다",
  notInteger: "[ERROR] 정수가 아닌 값입니다.",

  undividableByLottoPriceHead: "[ERROR] 로또 금액(",
  undividableByLottoPriceTail: ")으로 나눠지지 않는 금액입니다.",

  invalidBuyAmountRangeHead: "[ERROR] 유효한 구입 금액 범위(",
  invalidBuyAmountRangeMiddle: " ~ ",
  invalidBuyAmountRangeTail: ")를 벗어났습니다.",
};

const INPUT = {
  buyAmount: "구입금액을 입력해 주세요.",
  winningNumbers: "당첨 번호를 입력해 주세요. ",
  bonusNumber: "보너스 번호를 입력해 주세요. ",
  retryChecker: "다시 시작하시겠습니까? (y/n) ",
};

const OUTPUT = {
  boughtLottosCompletedTail: "개를 구매했습니다.",

  arrayFormatHead: "[",
  arrayFormatTail: "]",
  arrayFormatSeparator: ", ",

  lottoResultIntro: "당첨 통계",
  lottoResultHorizontalLine: "--------------------",

  fifthRankCountHead: "3개 일치 (5,000원) - ",
  fourthRankCountHead: "4개 일치 (50,000원) - ",
  thirdRankCountHead: "5개 일치 (1,500,000원) - ",
  secondRankCountHead: "5개 일치, 보너스 볼 일치 (30,000,000원) - ",
  firstRankCountHead: "6개 일치 (2,000,000,000원) - ",

  lottoUnit: "개",

  profitRateHead: "총 수익률은 ",
  profitRateTail: "%입니다.",
};

const MESSAGES = { ERROR, INPUT, OUTPUT };

export default MESSAGES;
