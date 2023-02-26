import LOTTO from './lotto';
import LOTTO_GAME from './lottoGame';

const ERROR = {
  BUY_MONEY: `[ERROR] 구입금액은 ${LOTTO.PRICE}원 단위로 입력해야합니다.(ex. ${LOTTO.PRICE * 5})`,
  LUCKY_NUMBERS: `[ERROR] 당첨번호는 ${LOTTO.MIN_RANGE}~${LOTTO.MAX_RANGE}까지 중복되지 않는 숫자 ${LOTTO.NUMBERS_LENGTH}자리를 입력해야합니다. (ex. 1,2,3,4,5,6)`,
  BONUS_NUMBER: `[ERROR] 보너스 번호는 당첨번호와 중복되지 않는 ${LOTTO.MIN_RANGE}~${LOTTO.MAX_RANGE}까지의 숫자 1개를 입력해야합니다.`,
  RETRY_COMMAND: `[ERROR] 재시작 여부는 ${LOTTO_GAME.RETRY} 또는 ${LOTTO_GAME.QUIT}을 입력해야합니다.`,
};

export default ERROR;
