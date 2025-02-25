import { SEPARATOR } from '../constants/CONFIGURATIONS.js';
import { SYSTEM_MESSAGE } from '../constants/MESSAGES.js';
import readLineAsync from '../utils/readLineAsync.js';
import { BonusNumberValidator } from '../validators/BonusNumberValidator.js';
import { PurchasePriceValidator } from '../validators/PurchasePriceValidator.js';
import RestartValidator from '../validators/RestartValidator.js';
import { WinningNumbersValidator } from '../validators/WinningNumbersValidator.js';

const InputView = {
  async enterPurchasePrice() {
    const purchasePrice = await readLineAsync(
      SYSTEM_MESSAGE.ENTER_PURCHASE_PRICE,
    );
    PurchasePriceValidator.validate(Number(purchasePrice));
    return purchasePrice;
  },

  async enterWinningNumbers() {
    const winningNumbers = await readLineAsync(
      SYSTEM_MESSAGE.ENTER_WINNING_NUMBERS,
    );
    const splittedWinningNumbers = winningNumbers.split(SEPARATOR).map(Number);
    WinningNumbersValidator.validate(splittedWinningNumbers);
    return splittedWinningNumbers;
  },

  async enterBonusNumber(winningNumbers) {
    const bonusNumber = await readLineAsync(SYSTEM_MESSAGE.ENTER_BONUS_NUMBER);
    const transformedBonusNumber = Number(bonusNumber);
    BonusNumberValidator.validate(transformedBonusNumber, winningNumbers);
    return transformedBonusNumber;
  },

  async enterRestart() {
    const restartInput = await readLineAsync(SYSTEM_MESSAGE.ENTER_RESTART);
    RestartValidator.validate(restartInput);
    return restartInput;
  },
};

export default InputView;
