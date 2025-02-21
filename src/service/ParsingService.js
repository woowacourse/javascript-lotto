import Lotto from '../model/Lotto.js';
import { userPrompts } from '../settings/systemSettings.js';
import readLineAsync from '../View/InputView.js';
import { printPurchasedAmount, printError } from '../View/OutputView.js';
import validateBonusNumber from '../Validation/validateBonusNumber.js';
import validateLottoPurchase from '../Validation/validateLottoPurchase.js';
import validateUserRetry from '../Validation/validateUserRetry.js';

async function getPurchasePrice() {
  try {
    const purchasePrice = await readLineAsync(userPrompts.askPurchasePrice);
    const purchaseAmount = validateLottoPurchase(purchasePrice.trim());
    printPurchasedAmount(purchaseAmount);
    return { purchasePrice, purchaseAmount };
  } catch (error) {
    printError(error.message);
    return await getPurchasePrice();
  }
}
async function getWinningNumber() {
  try {
    const winningNumber = await readLineAsync(userPrompts.askWinningNumber);
    const userLotto = new Lotto(
      winningNumber
        .trim()
        .split(',')
        .map((number) => Number(number)),
    );
    return userLotto;
  } catch (error) {
    printError(error.message);
    return await getWinningNumber();
  }
}
async function applyBonusNumber(userLotto) {
  try {
    const bonusNumber = await readLineAsync(userPrompts.askBonusNumber);
    const parsedLotto = validateBonusNumber(
      userLotto,
      Number(bonusNumber.trim()),
    );
    return parsedLotto;
  } catch (error) {
    printError(error.message);
    return await applyBonusNumber(userLotto);
  }
}

async function getUserRetry() {
  try {
    const userRetry = await readLineAsync(`${userPrompts.askUserRetry}`);
    validateUserRetry(userRetry);
    return userRetry;
  } catch (error) {
    printError(error.message);
    return await getUserRetry();
  }
}

export { getPurchasePrice, getWinningNumber, applyBonusNumber, getUserRetry };
