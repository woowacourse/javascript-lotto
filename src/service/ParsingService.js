import Lotto from '../model/Lotto.js';
import INPUT_MESSAGE from '../constants/InputMessage.js';
import readLineAsync from '../View/InputView.js';
import { printPurchasedAmount, printError } from '../View/OutputView.js';
import checkBonusNumber from '../Validation/checkBonusNumber.js';
import checkLottoPurchase from '../Validation/checkLottoPurchase.js';
import checkUserRetry from '../Validation/checkUserRetry.js';
import { LOTTO_PRICE } from '../constants/MagicNumber.js';
import clearUIElements from '../clearUIElements.js';

async function getPurchasePrice(inputMethod) {
  try {
    const purchasePrice = await inputMethod();
    const purchaseAmount = checkLottoPurchase(purchasePrice) / LOTTO_PRICE;
    printPurchasedAmount(purchaseAmount);
    return { purchasePrice, purchaseAmount };
  } catch (error) {
    printError(error.message);
    alert(error.message);
    clearUIElements();
    return inputMethod();
  }
}
async function getWinningNumber(inputMethod) {
  try {
    const winningNumber = await inputMethod();
    const userLotto = new Lotto(
      winningNumber.split(',').map((number) => Number(number)),
    );
    return userLotto;
  } catch (error) {
    printError(error.message);
    return inputMethod();
  }
}
async function getBonusNumber(userLotto, inputMethod) {
  try {
    const bonusNumber = await inputMethod();
    const parsedLotto = checkBonusNumber(userLotto, Number(bonusNumber));
    return parsedLotto;
  } catch (error) {
    printError(error.message);
    return inputMethod();
  }
}

async function getUserRetry(inputMethod) {
  try {
    const userRetry = await inputMethod();
    checkUserRetry(userRetry);
    return userRetry;
  } catch (error) {
    printError(error.message);
    return inputMethod();
  }
}

export { getPurchasePrice, getWinningNumber, getBonusNumber, getUserRetry };
