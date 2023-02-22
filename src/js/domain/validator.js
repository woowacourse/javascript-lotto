import { ERROR, REGEX, COMMAND, GAME_VALUE } from '../constants/index.js';

class Validator {
  #missionStep;

  constructor(missionStep) {
    this.#missionStep = missionStep;
  }

  throwErrorIfInvalidBudget(budget) {
    this.#throwErrorIfNotDecimal(budget);
    this.#throwErrorIfNotDivisiable(budget, GAME_VALUE.LOTTO_PRICE);
  }

  throwErrorIfInvalidWinningLotto(winningNumberFormat) {
    this.#throwErrorIfInsufficientNumberCount(winningNumberFormat);
    this.#throwErrorIfInvalidWinningLottoFormat(winningNumberFormat);
    this.#throwErrorIfIncludesDuplicate(winningNumberFormat);
  }

  throwErrorIfInvalidUserCommand(userCommand) {
    const isValidUserCommand = COMMAND.RESTART === userCommand || COMMAND.EXIT === userCommand;

    if (!isValidUserCommand) {
      throw new Error(ERROR.INVALID_RETRY_COMMAND);
    }
  }

  throwErrorIfInvalidBonusNumber(winningLotto, bonusNumber) {
    this.#throwErrorIfInvalidBonusNumberFormat(bonusNumber);
    this.#throwErrorIfBonusNumberDuplicates(winningLotto, bonusNumber);
  }

  #throwErrorIfNotDecimal(number) {
    if (!REGEX.DECIMAL.test(number)) {
      throw new Error(ERROR.NOT_DECIMAL[this.#missionStep]);
    }
  }

  #throwErrorIfNotDivisiable(number, divisor) {
    const isDivisiableByDivisor = Boolean(number % divisor) === false;

    if (!isDivisiableByDivisor) {
      throw new Error(ERROR.BUDGET_NOT_DIVISIBLE[this.#missionStep](divisor));
    }
  }

  #throwErrorIfInsufficientNumberCount(winningLotto) {
    const lottoNumberCount = (winningLotto.match(REGEX.LOTTO_NUMBER_COUNT) || []).length;
    if (lottoNumberCount < GAME_VALUE.LOTTO_SIZE) {
      throw new Error(ERROR.INSUFFICIENT_LOTTO_NUMBER_COUNT[this.#missionStep]);
    }
  }

  #throwErrorIfInvalidWinningLottoFormat(winningLotto) {
    if (!REGEX.WINNING_LOTTO_FORMAT.test(winningLotto)) {
      throw new Error(ERROR.INVALID_LOTTO_FORMAT[this.#missionStep]);
    }
  }

  #throwErrorIfInvalidBonusNumberFormat(bonusNumber) {
    if (!REGEX.BONUS_NUMBER.test(bonusNumber)) {
      throw new Error(ERROR.INVALID_BONUS_NUMBER_FORMAT[this.#missionStep]);
    }
  }

  #throwErrorIfBonusNumberDuplicates(winningLotto, bonusNumber) {
    const listedWinningLotto = winningLotto.split(',').map(Number);

    if (listedWinningLotto.includes(bonusNumber)) {
      throw new Error(ERROR.BONUS_NUMBER_DUPLICATES[this.#missionStep]);
    }
  }

  #throwErrorIfIncludesDuplicate(winningLotto) {
    const numbers = winningLotto.split(',');
    const haveDuplicates = numbers.length !== new Set(numbers).size;

    if (haveDuplicates) {
      throw new Error(ERROR.LOTTO_DUPLICATES[this.#missionStep]);
    }
  }
}

export default Validator;
