import CONFIG from './config';

const ERROR_MESSAGES = Object.freeze({
  MONEY: Object.freeze({
    EMPTY_VALUE: `로또 구입 금액은 ${CONFIG.LOTTO.PRICE.MIN}원 이하일 수 없다.`,
    REST_VALUE: `로또 구입 금액은 ${CONFIG.LOTTO.PRICE.MIN}원으로 나눠떨어져야 한다.`,
    MAX_VALUE: `로또 구입 금액은 ${CONFIG.LOTTO.PRICE.MAX}원 이하만 가능하다.`,
  }),
  LOTTO: Object.freeze({
    NUMBER: Object.freeze({
      QUANTITY: `로또 번호는 ${CONFIG.LOTTO.LENGTH}자리여야 한다.`,
      RANGE: `로또 번호의 숫자 범위는 ${CONFIG.LOTTO.NUMBER.MIN} ~ ${CONFIG.LOTTO.NUMBER.MAX}이다.`,
      DUPLICATION: '로또 번호의 숫자는 중복될 수 없다.',
    }),
    BONUS: Object.freeze({
      RANGE: `보너스 번호의 숫자 범위는 ${CONFIG.LOTTO.NUMBER.MIN} ~ ${CONFIG.LOTTO.NUMBER.MAX}이다.`,
      DUPLICATION: '보너스 번호는 당첨 로또에 있는 숫자와 중복되면 안된다.',
    }),
  }),
  RESTART: Object.freeze({
    YES_OR_NO: `${CONFIG.ANSWER.YES} 혹은 ${CONFIG.ANSWER.NO} 중에 하나를 입력해주세요.`,
  }),
});

export default ERROR_MESSAGES;
