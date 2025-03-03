import CONFIG from '../constants/config.js';

const ERROR_MESSAGES = Object.freeze({
  MONEY: Object.freeze({
    EMPTY_VALUE: '로또 구입 금액은 0원 이하일 수 없다.',
    REST_VALUE: '로또 구입 금액은 1,000원으로 나눠떨어져야 한다.',
  }),
  LOTTO: Object.freeze({
    NUMBER: Object.freeze({
      QUANTITY: '로또 번호는 6자리여야 한다.',
      RANGE: '로또 번호의 숫자 범위 1 ~ 45이다.',
      DUPLICATION: '로또 번호의 숫자는 중복될 수 없다.',
    }),
    BONUS: Object.freeze({
      RANGE: '보너스 번호의 숫자 범위 1 ~ 45이다.',
      DUPLICATION: '보너스 번호는 당첨 로또에 있는 숫자와 중복되면 안된다.',
    }),
  }),
  RESTART: Object.freeze({
    YES_OR_NO: 'y 혹은 n 중에 하나를 입력해주세요.',
  }),
});

function validateMoney(money) {
  const ZERO = 0;
  if (money <= CONFIG.INITIAL_MONEY) {
    throw new Error(ERROR_MESSAGES.MONEY.EMPTY_VALUE);
  }
  if (money % CONFIG.LOTTO.PRICE !== ZERO) {
    throw new Error(ERROR_MESSAGES.MONEY.REST_VALUE);
  }
}

function lottoNumberCondition(number) {
  return number >= CONFIG.LOTTO.NUMBER.MIN && number <= CONFIG.LOTTO.NUMBER.MAX;
}

function validateLottoNumber(numbers) {
  if (numbers.length !== CONFIG.LOTTO.LENGTH) {
    throw new Error(ERROR_MESSAGES.LOTTO.NUMBER.QUANTITY);
  }

  if (!numbers.every(lottoNumberCondition)) {
    throw new Error(ERROR_MESSAGES.LOTTO.NUMBER.RANGE);
  }

  if (new Set(numbers).size !== CONFIG.LOTTO.LENGTH) {
    throw new Error(ERROR_MESSAGES.LOTTO.NUMBER.DUPLICATION);
  }
}

function validateBonus(bonus, winningLotto) {
  if (!lottoNumberCondition(bonus)) {
    throw new Error(ERROR_MESSAGES.LOTTO.BONUS.RANGE);
  }

  if (winningLotto.includes(bonus)) {
    throw new Error(ERROR_MESSAGES.LOTTO.BONUS.DUPLICATION);
  }
}

function validateRestart(lowerCaseInput) {
  if (lowerCaseInput !== CONFIG.ANSWER.YES && lowerCaseInput !== CONFIG.ANSWER.NO) {
    throw new Error(ERROR_MESSAGES.RESTART.YES_OR_NO);
  }
}

export {
  validateMoney, validateLottoNumber, validateBonus, validateRestart,
};
