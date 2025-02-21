import PRICE from "./price.js";
import RESTART_ANSWER from "./answer.js";
import { LOTTO } from "./lotto.js";

const ERROR_MESSAGE = {
  NOT_A_NUMBER: "[ERROR] 숫자를 입력해주세요.",
  NOT_DIVIDED_1000: `[ERROR] ${PRICE.UNIT}으로 나누어 떨어지는 숫자를 입력해주세요.`,
  UNDER_MIN_PRICE: `[ERROR] 최소 결제 금액은 ${PRICE.UNIT}원 이상입니다.`,
  EXCEED_MAX_PRICE: `[ERROR] 최대 결제 금액은 ${PRICE.MAX}원 미만입니다.`,
  LOTTO_LENGTH: `[ERROR] 당첨 번호는 ${LOTTO.LENGTH}개여야 합니다.`,
  DUPLICATE_WINNING_NUMBER:
    "[ERROR] 당첨 번호는 중복된 번호를 입력할 수 없습니다.",
  DUPLICATE_BONUS_NUMBER:
    "[ERROR] 입력하신 보너스 번호가 당첨 번호와 중복됩니다.",
  NUMBER_OUT_OF_RANGE: `[ERROR] ${LOTTO.MIN_RANDOM_VALUE}과 ${LOTTO.MAX_RANDOM_VALUE} 사이의 숫자를 입력해주세요.`,
  YES_OR_NO: `[ERROR] ${RESTART_ANSWER.YES} 혹은 ${RESTART_ANSWER.NO}으로 입력해 주세요.`,
};

export default ERROR_MESSAGE;
