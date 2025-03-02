import Lotto from '../model/Lotto.js';
import { printPurchasedAmount } from '../View/OutputView.js';
import checkBonusNumber from '../Validation/checkBonusNumber.js';
import checkLottoPurchase from '../Validation/checkLottoPurchase.js';
import checkUserRetry from '../Validation/checkUserRetry.js';
import { LOTTO_PRICE } from '../constants/MagicNumber.js';
import { defaultErrorHandler } from '../util/errorHandler.js';

async function getPurchasePrice(
  inputMethod,
  handleError = defaultErrorHandler,
) {
  try {
    const purchasePrice = await inputMethod();
    console.log(purchasePrice);
    const purchaseAmount = checkLottoPurchase(purchasePrice) / LOTTO_PRICE;
    printPurchasedAmount(purchaseAmount);
    return { purchasePrice, purchaseAmount };
  } catch (error) {
    handleError(error);
    return getPurchasePrice(inputMethod, handleError);
  }
}
async function getWinningNumber(
  inputMethod,
  handleError = defaultErrorHandler,
) {
  try {
    const winningNumber = await inputMethod();
    const userLotto = new Lotto(
      winningNumber.split(',').map((number) => Number(number)),
    );
    return userLotto;
  } catch (error) {
    handleError(error);
    return getWinningNumber(inputMethod, handleError);
  }
}
async function getBonusNumber(
  userLotto,
  inputMethod,
  handleError = defaultErrorHandler,
) {
  try {
    const bonusNumber = await inputMethod();
    const parsedLotto = checkBonusNumber(userLotto, Number(bonusNumber));
    return parsedLotto;
  } catch (error) {
    handleError(error);
    return getBonusNumber(inputMethod, handleError);
  }
}

async function getUserRetry(inputMethod, handleError = defaultErrorHandler) {
  try {
    const userRetry = await inputMethod();
    checkUserRetry(userRetry);
    return userRetry;
  } catch (error) {
    handleError(error);
    return getUserRetry(inputMethod, handleError);
  }
}

export { getPurchasePrice, getWinningNumber, getBonusNumber, getUserRetry };
