import { LOTTO_SETTING } from './setting';

export const ERROR_MESSAGE = Object.freeze({
  NOT_POSITIVE_NUMBER_INPUT: '0 이상의 숫자만 입력할 수 있습니다.',
  WRONG_LOTTO_PRICE_UNIT_INPUT: `로또 금액은 ${LOTTO_SETTING.PRICE}원 단위로 입력할 수 있습니다.`,

  WINNING_NUMBER_EMPTY_INPUT: '당첨 번호에 빈 칸이 있습니다.',
  WINNING_NUMBER_NUMBER_RANGE: '당첨 번호는 1에서 45까지의 숫자만 입력할 수 있습니다.',
  WINNING_NUMBER_DIFF_LENGTH:
    '당첨 번호는 당첨 번호 6자리와 보너스 번호 1자리로 총 7자리를 입력해주셔야 합니다.',
  WINNING_NUMBER_DUPLICATE_NUMBER: '당첨 번호는 중복된 숫자를 입력할 수 없습니다.',
});
