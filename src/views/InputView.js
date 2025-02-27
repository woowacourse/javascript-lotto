<<<<<<< HEAD
import { KEY, SEPARATOR } from '../constants/Configurations.js';
import { SYSTEM_MESSAGE } from '../constants/Messages.js';
import readLineAsync from '../utils/readLineAsync.js';
import { BonusNumberValidator } from '../validators/BonusNumberValidator.js';
import { PurchasePriceValidator } from '../validators/PurchasePriceValidator.js';
import RestartValidator from '../validators/RestartValidator.js';
import { LottoNumbersValidator } from '../validators/LottoNumbersValidator.js';

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
    LottoNumbersValidator.validate(KEY.WINNING_NUMBERS, splittedWinningNumbers);
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
=======
import { SYSTEM_MESSAGE } from '../constants/MESSAGES.js';
import readLineAsync from '../utils/readLineAsync.js';

const InputView = {
  async enterPurchasePrice() {
    return await readLineAsync(SYSTEM_MESSAGE.ENTER_PURCHASE_PRICE);
  },

  async enterWinningNumbers() {
    return await readLineAsync(SYSTEM_MESSAGE.ENTER_WINNING_NUMBERS);
  },

  async enterBonusNumber() {
    return await readLineAsync(SYSTEM_MESSAGE.ENTER_BONUS_NUMBER);
  },

  async enterRestart() {
    return await readLineAsync(SYSTEM_MESSAGE.ENTER_RESTART);
>>>>>>> 0f9ff21ed0cd6104c06a2b5d22feb4bc389fa693
  },
};

export default InputView;
