import CONFIG from '../constants/config.js';
import { ERROR } from '../constants/message.js';

function validateMoney(money) {
  if (money <= CONFIG.INITIAL_NUMBER) {
    throw new Error(ERROR.MONEY.EMPTY_VALUE);
  }
  if (money % CONFIG.LOTTO_PRICE !== CONFIG.INITIAL_NUMBER) {
    throw new Error(ERROR.MONEY.REST_VALUE);
  }
}

function lottoNumberCondition(number) {
  return number >= CONFIG.MIN.LOTTO_NUMBER && number <= CONFIG.MAX.LOTTO_NUMBER;
}

function validateLottoNumber(numbers) {
  if (numbers.length !== CONFIG.MAX.LOTTO_LENGTH) {
    throw new Error(ERROR.LOTTO_NUMBER.QUANTITY);
  }

  if (!numbers.every(lottoNumberCondition)) {
    throw new Error(ERROR.LOTTO_NUMBER.RANGE);
  }

  if (new Set(numbers).size !== CONFIG.MAX.LOTTO_LENGTH) {
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
  if (lowerCaseInput !== 'y' && lowerCaseInput !== 'n') {
    throw new Error(ERROR.RESTART.YES_OR_NO);
  }
}

export {
  validateMoney, validateLottoNumber, validateBonus, validateRestart,
};
