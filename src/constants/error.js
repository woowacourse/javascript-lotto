import COMMAND from './command';
import LOTTO from './lotto';

export const ERROR_LOTTO = Object.freeze({
  COST: '구입금액은 1000원 단위로 입력해주세요.',
  NUMBER: `로또 번호는 ${LOTTO.MIN_NUMBER}부터 ${LOTTO.MAX_NUMBER}까지의 정수를 입력해주세요.`,
  SIZE: `로또 번호를 ${LOTTO.SIZE}개를 입력해주세요.`,
  NUMBERS_DUPLICATE: '로또 번호는 중복된 번호를 입력할 수 없습니다.',
  BONUS_DUPLICATE: '보너스 번호는 당첨 번호와 중복될 수 없습니다.',
});

export const ERROR_COMMAND = Object.freeze({
  COMMAND: `재시작을 하려면 ${COMMAND.RESTART}, 종료하려면 ${COMMAND.QUIT}을 입력해주세요.`,
});
