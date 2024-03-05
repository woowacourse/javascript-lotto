import CONDITION from './Condition';
import MESSAGE from './Message';

const ERROR = {
  beNotBlank: `${MESSAGE.errorCharacter} 숫자 입력은 공백이 아니어야 합니다.`,
  beNumber: `${MESSAGE.errorCharacter} 입력은 숫자형 이어야 합니다.`,
  beInRangeNumber: `${MESSAGE.errorCharacter} 입력은 ${CONDITION.lottoNumberMin}~${CONDITION.lottoNumberMax}사이의 숫자여야 합니다.`,
  beInteger: `${MESSAGE.errorCharacter} 입력은 정수여야 합니다.`,

  beNotDuplicated: `${MESSAGE.errorCharacter} 로또 번호의 중복은 없어야합니다.`,
  countOfWinningNumbers: `${MESSAGE.errorCharacter} 당첨 번호의 갯수는 ${CONDITION.countOfNumberInTicket}개여야 합니다.`,

  bonusNumberDuplication: `${MESSAGE.errorCharacter} 보너스 번호는 당첨 번호와 중복되지 않아야합니다.`,

  beMultiple: `${MESSAGE.errorCharacter} 구입금액은 ${CONDITION.pricePerLotto}의 배수여야 합니다.`,

  retryYN: `${MESSAGE.errorCharacter} 재시도 여부는 y나 n값이어야 합니다.`,
};

export default ERROR;
