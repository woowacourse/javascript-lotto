import Lotto from '../model/Lotto.js';
import INPUT_MESSAGE from '../constants/InputMessage.js';
import readLineAsync from '../View/InputView.js';
import { printPurchasedAmount, printError } from '../View/OutputView.js';
import checkBonusNumber from '../Validation/checkBonusNumber.js';
import checkLottoPurchase from '../Validation/checkLottoPurchase.js';
import checkUserRetry from '../Validation/checkUserRetry.js';
import { LOTTO_PRICE } from '../constants/MagicNumber.js';

async function getPurchasePrice(inputMethod, retry) {
  try {
    const purchasePrice = await inputMethod();
    const purchaseAmount = checkLottoPurchase(purchasePrice) / LOTTO_PRICE;
    printPurchasedAmount(purchaseAmount);
    return { purchasePrice, purchaseAmount };
  } catch (error) {
    printError(error.message);
    return retry();
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
    return getWinningNumber(inputMethod);
  }
}
async function getBonusNumber(userLotto, inputMethod) {
  try {
    const bonusNumber = await inputMethod();
    const parsedLotto = checkBonusNumber(userLotto, Number(bonusNumber));
    return parsedLotto;
  } catch (error) {
    printError(error.message);
    return await getBonusNumber(userLotto, inputMethod);
  }
}

async function getUserRetry() {
  try {
    const userRetry = await readLineAsync(`${INPUT_MESSAGE.askUserRetry}`);
    checkUserRetry(userRetry);
    return userRetry;
  } catch (error) {
    printError(error.message);
    return await getUserRetry();
  }
}

export { getPurchasePrice, getWinningNumber, getBonusNumber, getUserRetry };
