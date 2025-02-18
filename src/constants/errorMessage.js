import { LOTTO_NUMBERS } from "./systemConstants.js";

export const LOTTO_NUMBERS_ERROR_MESSAGE = {
  LENGTH: `로또 번호는 ${LOTTO_NUMBERS.LENGTH}개 여야합니다. 다시 입력해 주세요.`,
  RANGE: `로또 번호는 ${LOTTO_NUMBERS.MIN}부터 ${LOTTO_NUMBERS.MAX}사이의 숫자여야 합니다. 다시 입력해 주세요.`,
  DUPLICATE: "로또 번호가 중복됐습니다. 다시 입력해 주세요.",
};
