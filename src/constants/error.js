import { LOTTO_LENGTH, LOTTO_RANGE } from "./option.js";
import { LOTTO_PRICE } from "./system.js";

const ERROR_MESSAGE = {
  PREFIX: "[ERROR]",
  INVALID_PURCHASE_AMOUNT_TYPE: "구입 금액은 숫자로 입력해주세요.",
  INVALID_PURCHASE_AMOUNT_RANGE: `구입 금액은 ${LOTTO_PRICE.toLocaleString()}원 이상의 값을 입력해주세요`,
  INVALID_PURCHASE_AMOUNT_DIVIDED: `구입 금액은 ${LOTTO_PRICE.toLocaleString()}원 단위로 입력해주세요.`,
  INVALID_LOTTO_NUMBER_LENGTH: `로또 번호로 ${LOTTO_LENGTH}개를 입력해주세요.`,
  INVALID_LOTTO_NUMBER_DUPLICATE: "로또 번호에 중복된 숫자가 있습니다.",
  INVALID_LOTTO_NUMBER_RANGE: `"로또 번호로 ${LOTTO_RANGE.MIN} ~ ${LOTTO_RANGE.MAX} 사이의 숫자를 입력해주세요.`,
  INVALID_LOTTO_NUMBER_TYPE: "로또 번호는 숫자로만 입력해주세요.",
  INVALID_BONUS_NUMBER_DUPLICATE:
    "보너스 번호는 당첨 로또 번호와 중복되면 안됩니다.",
  INVALID_BONUS_NUMBER_RANGE: `"보너스 번호로 ${LOTTO_RANGE.MIN} ~ ${LOTTO_RANGE.MAX} 사이의 숫자를 입력해주세요.`,
  INVALID_BONUS_NUMBER_TYPE: "보너스 번호는 숫자로만 입력해주세요.",
};
export default ERROR_MESSAGE;
