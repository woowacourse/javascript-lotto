import { KEY, SEPARATOR } from '../../common/constants/Configurations.js';
import { SYSTEM_MESSAGE } from '../../common/constants/Messages.js';
import readLineAsync from '../../common/utils/readLineAsync.js';
import { BonusNumberValidator } from '../../common/validators/BonusNumberValidator.js';
import { PurchasePriceValidator } from '../../common/validators/PurchasePriceValidator.js';
import RestartValidator from '../../common/validators/RestartValidator.js';
import { LottoNumbersValidator } from '../../common/validators/LottoNumbersValidator.js';

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
  },
};

export default InputView;
