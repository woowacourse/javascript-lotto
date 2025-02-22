import { LOTTO, PURCHASE } from "./const.js";

export const ERROR_MESSAGE = {
  PURCHASE_UNIT: `구입 금액은 ${PURCHASE.UNIT.toLocaleString()}원 단위로 입력해주세요.`,
  PURCHASE_MIN_VALUE: `구입 금액은 ${PURCHASE.UNIT.toLocaleString()}원 이상이여야 합니다.`,
  PURCHASE_MAX_VALUE: `구입 금액은 ${PURCHASE.MAX_AMOUNT.toLocaleString()}원 이하여야 합니다.`,
  IS_NUMERIC: `숫자를 입력해주세요.`,
  LOTTO_NUMBER_RANGE: `당첨 번호가 ${LOTTO.MIN_NUMBER}부터 ${LOTTO.MAX_NUMBER} 사이의 숫자여야 합니다.`,
  WINNING_NUMBER_IS_NUMERIC: `당첨 번호는 숫자여야 합니다.`,
  WINNING_NUMBER_DUPLICATE: "당첨 번호는 중복되지 않아야 합니다",
  WINNING_NUMBERS_LENGTH: "당첨 번호는 6개여야 합니다.",
  BONUS_NUMBER_UNIQUE: "보너스 번호는 당첨 번호와 중복되면 안됩니다.",
  RESTART_INPUT: "입력은 y 또는 n만 가능합니다.",
};
