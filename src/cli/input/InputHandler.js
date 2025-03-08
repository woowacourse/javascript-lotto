import InputView from '../view/InputView.js';
import Lotto from '../../common/domain/Lotto.js';
import validatePurchaseMoney from '../../common/validations/validate/PurchaseMoneyValidate.js';
import validateBonusNumber from '../../common/validations/validate/BonusNumberValidate.js';
import { validateYorN } from '../../common/validations/validate/ReStartValidate.js';
import { LOTTO_NUMBER_DELIMITER, INPUT_MESSAGE } from '../../common/constants/constants.js';

const InputHandler = {
  async purchaseMoney() {
    const purchaseMoney = await InputView.readUserInput(INPUT_MESSAGE.PURCHASE);
    validatePurchaseMoney(Number(purchaseMoney));
    return purchaseMoney;
  },

  async winningNumbers() {
    const winningNumbers = await InputView.readUserInput(INPUT_MESSAGE.WINNING_NUMBERS);
    return new Lotto(winningNumbers.split(LOTTO_NUMBER_DELIMITER).map((num) => Number(num)));
  },

  async bonusNumber(winningNumbers) {
    const bonusNumber = Number(await InputView.readUserInput(INPUT_MESSAGE.BONUS_NUMBER));
    validateBonusNumber(winningNumbers, bonusNumber);
    return bonusNumber;
  },

  async reStart() {
    const input = await InputView.readUserInput(INPUT_MESSAGE.RE_START);
    validateYorN(input);
    return input;
  },
};

export default InputHandler;
