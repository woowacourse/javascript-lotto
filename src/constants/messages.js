import { LOTTO_RANK } from "./lotto.js";

const addErrorPrefix = (message) => `[ERROR] ${message}`;

export const ERROR_MESSAGE = {
  invalidRetryChecker: addErrorPrefix(
    "유효하지 않은 재시작 옵션입니다. (y/n 중 선택해주세요)"
  ),
  notInLottoNumberRange: addErrorPrefix("유효한 범위 로또 숫자가 아닙니다."),
  hasDuplicateElements: addErrorPrefix("중복된 요소가 포함됩니다."),
  nonNegativeIntegerString: addErrorPrefix(
    "10진수 양의 정수로 변환되는 숫자가 아닙니다"
  ),
  invalidLottoNumbersLength: addErrorPrefix(
    "유효한 개수의 로또 숫자가 아닙니다"
  ),
  notInteger: addErrorPrefix("정수가 아닌 값입니다."),
};

export const errorMessageFormatter = {
  undividableByLottoPrice: (price) =>
    `로또 금액(${price})으로 나눠지지 않는 금액입니다.`,
  invalidBuyAmountRange: (min, max) =>
    `유효한 구입 금액 범위(${min} ~ ${max})를 벗어났습니다.`,
};

export const INPUT_MESSAGE = {
  buyAmount: "구입금액을 입력해 주세요.",
  winningNumbers: "당첨 번호를 입력해 주세요. ",
  bonusNumber: "보너스 번호를 입력해 주세요. ",
  retryChecker: "다시 시작하시겠습니까? (y/n) ",
};

export const outputMessageFormatter = {
  boughtLottosCompleted: (count) => `${count}개를 구매했습니다.`,
  array: (array) => `[${array.join(", ")}]`,
  lottoResult: (rankResult, profitRate) =>
    `
당첨 통계
--------------------
3개 일치 (5,000원) - ${rankResult[LOTTO_RANK.fifth]}개
4개 일치 (50,000원) - ${rankResult[LOTTO_RANK.fourth]}개
5개 일치 (1,500,000원) - ${rankResult[LOTTO_RANK.third]}개
5개 일치, 보너스 볼 일치 (30,000,000원) - ${rankResult[LOTTO_RANK.second]}개
6개 일치 (2,000,000,000원) - ${rankResult[LOTTO_RANK.first]}개
총 수익률은 ${profitRate.toLocaleString()}%입니다.
  `,
};
