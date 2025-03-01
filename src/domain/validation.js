import { INITIAL_NUMBER, LOTTO_RULE, ANSWER } from './constants.js';
import { ERROR } from '../constants/message.js';

function validateMoney(money) {
  if (money <= INITIAL_NUMBER) {
    throw new Error(ERROR.MONEY.EMPTY_VALUE);
  }
  if (money % LOTTO_RULE.PRICE !== INITIAL_NUMBER) {
    throw new Error(ERROR.MONEY.REST_VALUE);
  }
  if (money > LOTTO_RULE.MAX_BUY_MONEY) {
    throw new Error(ERROR.MONEY.MAX_OVER_VALUE);
  }
}

function lottoNumberCondition(number) {
  return number >= LOTTO_RULE.MIN_RANGE && number <= LOTTO_RULE.MAX_RANGE;
}

function validateLottoNumber(numbers) {
  if (numbers.length !== LOTTO_RULE.LENGTH) {
    throw new Error(ERROR.LOTTO_NUMBER.QUANTITY);
  }

  if (!numbers.every(lottoNumberCondition)) {
    throw new Error(ERROR.LOTTO_NUMBER.RANGE);
  }

  if (new Set(numbers).size !== LOTTO_RULE.LENGTH) {
    throw new Error(ERROR.LOTTO_NUMBER.DUPLICATION);
  }
}

function validateBonus(bonus, winningLotto) {
  if (!lottoNumberCondition(bonus)) {
    throw new Error(ERROR.BONUS.RANGE);
  }

  if (winningLotto.includes(bonus)) {
    throw new Error(ERROR.BONUS.DUPLICATION);
  }
}

function validateRestart(lowerCaseInput) {
  if (lowerCaseInput !== ANSWER.RE_START && lowerCaseInput !== ANSWER.END) {
    throw new Error(ERROR.RESTART.YES_OR_NO);
  }
}

export { validateMoney, validateLottoNumber, validateBonus, validateRestart };
