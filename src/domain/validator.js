import LOTTO from '../constants/lotto';
import COMMAND from '../constants/command';
import { ERROR_COMMAND, ERROR_LOTTO } from '../constants/error';

const isPositiveInteger = (value) => Number.isInteger(value) && value > 0;

const isLottoNumber = (number) => {
  const isBeteween = number >= LOTTO.MIN_NUMBER && number <= LOTTO.MAX_NUMBER;
  return isPositiveInteger(number) && isBeteween;
};

const hasDuplicate = (numbers) => new Set(numbers).size !== numbers.length;

export const validatePurchaseAmount = (amount) => {
  if (!isPositiveInteger(amount)) throw new Error(ERROR_LOTTO.COST);
  if (amount % LOTTO.COST !== 0) throw new Error(ERROR_LOTTO.COST);
};

export const validateNumbers = (numbers) => {
  if (!numbers.every(isLottoNumber)) throw new Error(ERROR_LOTTO.NUMBER);
  if (numbers.length !== LOTTO.SIZE) throw new Error(ERROR_LOTTO.SIZE);
  if (hasDuplicate(numbers)) throw new Error(ERROR_LOTTO.NUMBERS_DUPLICATE);
};

export const validateBonusNumber = (winNumbers, bonusNumber) => {
  if (!isLottoNumber(bonusNumber)) throw new Error(ERROR_LOTTO.NUMBER);
  if (winNumbers.includes(bonusNumber)) throw new Error(ERROR_LOTTO.BONUS_DUPLICATE);
};

export const validateRestartCommand = (command) => {
  if (!Object.hasOwn(COMMAND, command)) throw new Error(ERROR_COMMAND.COMMAND);
};
