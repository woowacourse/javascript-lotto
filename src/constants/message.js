import { LOTTO_RULE } from "./lotto.js";

export const PROMPT_MESSAGE = Object.freeze({
  PURCHASE_PRICE: "구입금액을 입력해 주세요.",
  PURCHASE_QUANTITY: "개를 구매했습니다.",
  WINNING_NUMBER_INPUT: "당첨 번호를 입력해 주세요.",
  BONUS_NUMBER_INPUT: "보너스 번호를 입력해 주세요.",
  LOTTO_RESULT: "당첨 통계\n--------------------",
  RESTART_INPUT: "다시 시작하시겠습니까? (y/n)",
});

export const ERROR_MESSAGE = Object.freeze({
  INVALID_INTEGER: "정수만 입력 가능합니다.",
  INVALID_MULTIPLE_OF_THOUSAND: `${LOTTO_RULE.MULTIPLE_PRICE}원 단위로 입력해 주세요.`,
  INVALID_MIN_PRICE: `최소 구입 금액은 ${LOTTO_RULE.MIN_PRICE}원입니다.`,
  INVALID_OVER_MAX_PRICE: `최대 구입 금액은 ${LOTTO_RULE.MAX_PRICE}원입니다.`,
  INVALID_LOTTO_NUMBER_RANGE: `${LOTTO_RULE.MIN_LOTTO_NUMBER}부터 ${LOTTO_RULE.MAX_LOTTO_NUMBER}까지의 숫자를 입력해 주세요.`,
  INVALID_DUPLICATE_NUMBER: "중복된 숫자는 입력할 수 없습니다.",
  INVALID_LOTTO_LENGTH: `${LOTTO_RULE.LOTTO_LENGTH}개의 숫자를 입력해 주세요.`,
  INVALID_DUPLICATE_BONUS_NUMBER:
    "보너스 번호는 당첨 번호와 중복될 수 없습니다.",
  INVALID_RESTART: "y 또는 n을 입력해 주세요.",
});

export const ERROR_PREFIX = "[ERROR]";

export const LINE_BREAK = "\n";
