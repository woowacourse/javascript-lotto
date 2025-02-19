import { LOTTO_NUMBERS, LOTTO_PRICE } from "./systemConstants.js";

export const LOTTO_NUMBERS_ERROR_MESSAGE = {
  EMPTY: "로또 번호를 입력해주세요",
  EMPTY_ITEM: "로또 번호에 빈 값이 포함되어 있습니다. 다시 입력해주세요",
  LENGTH: `로또 번호는 ${LOTTO_NUMBERS.LENGTH}개 여야합니다. 다시 입력해 주세요.`,
  RANGE: `로또 번호는 ${LOTTO_NUMBERS.MIN}부터 ${LOTTO_NUMBERS.MAX}사이의 숫자여야 합니다. 다시 입력해 주세요.`,
  DUPLICATE: "로또 번호가 중복됐습니다. 다시 입력해 주세요.",
  NUMBER: "숫자만 입력할 수 있습니다. 다시 입력해 주세요.",
};

export const BONUS_NUMBER_ERROR_MESSAGE = {
  RANGE: `보너스 번호는 ${LOTTO_NUMBERS.MIN}부터 ${LOTTO_NUMBERS.MAX}사이의 숫자여야 합니다. 다시 입력해 주세요.`,
  DUPLICATE: "보너스 번호가 당첨 번호와 중복됩니다. 다시 입력해주세요.",
};

export const PRICE_ERROR_MESSAGE = {
  EMPTY: "구입 금액을 입력해주세요.",
  NUMBER: "숫자를 입력해주세요.",
  UNDER_PRICE: `${LOTTO_PRICE}원보다 큰 수를 입력해주세요`,
  INDIVISIBLE: `구입 금액은 ${LOTTO_PRICE}원 단위여야 합니다.`,
};
