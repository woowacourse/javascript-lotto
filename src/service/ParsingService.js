import validateBonusNumber from '../Validation/validateBonusNumber.js';
import readLineAsync from '../View/InputView.js';
import validateLottoPurchase from '../Validation/validateLottoPurchase.js';
import systemSettings from '../settings/systemSettings.js';
import { printPurchasedAmount, printError } from '../View/OutputView.js';
import validateUserRetry from '../Validation/validateUserRetry.js';
import Lotto from '../model/Lotto.js';

async function getPurchasePrice() {
  try {
    const purchasePrice = await readLineAsync(systemSettings.getPurchasePrice);
    const purchaseAmount = validateLottoPurchase(purchasePrice);
    printPurchasedAmount(purchaseAmount);
    return { purchasePrice, purchaseAmount };
  } catch (error) {
    printError(error.message);
    return await getPurchasePrice();
  }
}
async function getWinningNumber() {
  try {
    const winningNumber = await readLineAsync(systemSettings.getWinningNumber);
    const userLotto = new Lotto(
      winningNumber.split(',').map((number) => Number(number)),
    );
    return userLotto;
  } catch (error) {
    printError(error.message);
    return await getWinningNumber();
  }
}
async function getBonusNumber(userLotto) {
  try {
    const bonusNumber = await readLineAsync(systemSettings.getBonusNumber);
    const parsedLotto = validateBonusNumber(userLotto, Number(bonusNumber));
    return parsedLotto;
  } catch (error) {
    printError(error.message);
    return await getBonusNumber(userLotto);
  }
}

async function getUserRetry() {
  try {
    const userRetry = await readLineAsync(`${systemSettings.askUserRetry}`);
    validateUserRetry(userRetry);
    return userRetry;
  } catch (error) {
    printError(error.message);
    return await getUserRetry();
  }
}

export { getPurchasePrice, getWinningNumber, getBonusNumber, getUserRetry };
