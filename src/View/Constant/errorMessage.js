import { NEW_LINE } from './message.js';
const ERROR_PREFIX = '[ERROR]';

export const COMMON_ERROR_MESSAGE = {
  NO_EMPTY_SPACE: `${ERROR_PREFIX} 공백이나 빈 문자열이 포함될 수 없습니다.${NEW_LINE}`,
  NOT_INTEGER: `${ERROR_PREFIX} 정수가 아닙니다.${NEW_LINE}`,
};

export const LOTTO_PURCHASE_AMOUNT = {
  INVALID_PURCHASE_UNIT: `${ERROR_PREFIX} 로또 구입 금액은 1000원 단위의 정수여야 합니다.${NEW_LINE}`,
  INVALID_PURCHASE_RANGE: `${ERROR_PREFIX} 로또 구입 금액은 1회 1000원 이상 10만원 이하만 가능합니다.${NEW_LINE}`,
};

export const LOTTO_WINNING_NUMBERS = {
  INVALID_LOTTO_NUMBERS: `${ERROR_PREFIX} 당첨 번호 입력값에 공백이나 빈 문자열이 포함될 수 없습니다.${NEW_LINE}`,
  INVALID_LOTTO_COUNT: `${ERROR_PREFIX} 당첨 번호는 6개여야 합니다.${NEW_LINE}`,
  INVALID_LOTTO_RANGE: `${ERROR_PREFIX} 당첨 번호는 1 이상 45 이하의 정수여야 합니다.${NEW_LINE}`,
  DUPLICATE_LOTTO_NUMBERS: `${ERROR_PREFIX} 당첨 번호는 중복될 수 없습니다.${NEW_LINE}`,
};

export const LOTTO_BONUS_NUMBER = {
  INVALID_BONUS_NUMBER: `${ERROR_PREFIX} 보너스 번호 입력값에 공백이나 빈 문자열이 포함될 수 없습니다.${NEW_LINE}`,
  INVALID_BONUS_RANGE: `${ERROR_PREFIX} 보너스 번호는 1 이상 45 이하의 정수여야 합니다.${NEW_LINE}`,
  DUPLICATE_BONUS_NUMBER: `${ERROR_PREFIX} 보너스 번호는 당첨 번호와 중복될 수 없습니다.${NEW_LINE}`,
};

export const RETRY_MESSAGE = `${ERROR_PREFIX} 'y' 또는 'n'가 아닙니다.${NEW_LINE}`;
