import { LOTTO_CONDITION, RESTART_COMMAND } from '../constants/condition.js';
import { ERROR_MESSAGE } from '../constants/message.js';

const Validation = {
  validatePurchaseAmount(purchaseAmount) {
    if (!this.isNumber(purchaseAmount)) {
      return { isValid: false, message: ERROR_MESSAGE.invalidInputType };
    }

    if (!this.isHigherThanLottoPrice(purchaseAmount)) {
      return { isValid: false, message: ERROR_MESSAGE.lowerThanLottoPrice };
    }

    if (!this.isDivisibleByLottoPrice(purchaseAmount)) {
      return { isValid: false, message: ERROR_MESSAGE.indivisibleByLottoPrice };
    }

    return { isValid: true };
  },

  isNumber(purchaseAmount) {
    return Number.isInteger(Number(purchaseAmount));
  },

  isHigherThanLottoPrice(purchaseAmount) {
    return purchaseAmount >= LOTTO_CONDITION.lottoPrice;
  },

  isDivisibleByLottoPrice(purchaseAmount) {
    return purchaseAmount % LOTTO_CONDITION.lottoPrice === 0;
  },

  // validateWinningNumbers(winningNumbers) {
  //   if (!this.isValidWinningNumbersLength(winningNumbers)) {
  //     alert(ERROR_MESSAGE.invalidLottoNumberLength);
  //   }

  //   if (!this.hasOnlyNumber(winningNumbers)) {
  //     alert(ERROR_MESSAGE.invalidInputType);
  //   }

  //   if (!this.isValidWinningNumberRange(winningNumbers)) {
  //     alert(ERROR_MESSAGE.invalidLottoNumberRange);
  //   }
  // },

  // isValidWinningNumbersLength(winningNumbers) {
  //   return winningNumbers.length === LOTTO_CONDITION.lottoDigits;
  // },

  // hasOnlyNumber(winningNumbers) {
  //   return winningNumbers.every((winningNumber) => Number.isInteger(winningNumber));
  // },

  // isValidWinningNumberRange(winningNumbers) {
  //   return winningNumbers.every(
  //     (winningNumber) =>
  //       LOTTO_CONDITION.lottoNumberMinRange <= winningNumber &&
  //       winningNumber <= LOTTO_CONDITION.lottoNumberMaxRange
  //   );
  // },

  // validateBonusNumber(bonusNumber, winningNumbers) {
  //   if (!this.isNumber(bonusNumber)) {
  //     alert(ERROR_MESSAGE.invalidInputType);
  //   }

  //   if (!this.isValidBonusNumberRange(bonusNumber)) {
  //     alert(ERROR_MESSAGE.invalidLottoNumberRange);
  //   }

  //   if (!this.isUniqueBonusNumber(bonusNumber, winningNumbers)) {
  //     alert(ERROR_MESSAGE.duplicateLottoNumber);
  //   }
  // },

  // isValidBonusNumberRange(bonusNumber) {
  //   return (
  //     LOTTO_CONDITION.lottoNumberMinRange <= bonusNumber &&
  //     bonusNumber <= LOTTO_CONDITION.lottoNumberMaxRange
  //   );
  // },

  // isUniqueBonusNumber(bonusNumber, winningNumbers) {
  //   const combine = [bonusNumber, ...winningNumbers];
  //   const duplicateCheck = new Set(combine);

  //   return combine.length === duplicateCheck.size;
  // },

  // validateRestartCommand(command) {
  //   const commands = [RESTART_COMMAND.restart, RESTART_COMMAND.quit];

  //   if (!commands.includes(command)) {
  //     alert(ERROR_MESSAGE.invalidRestartCommand);
  //   }
  // },
};

export default Validation;
