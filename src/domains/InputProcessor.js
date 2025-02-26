import { PURCHASE_PRICE, SEPARATOR } from '../constants/CONFIGURATIONS.js';
import { BonusNumberValidator } from '../validators/BonusNumberValidator.js';
import { PurchasePriceValidator } from '../validators/PurchasePriceValidator.js';
import RestartValidator from '../validators/RestartValidator.js';
import { WinningNumbersValidator } from '../validators/WinningNumbersValidator.js';
import * as ConsoleInputView from '../views/console/InputView.js';
import * as WebInputView from '../views/web/InputView.js';

const CONSOLE = 'console';
const getView = (type) => (type === CONSOLE ? ConsoleInputView.default : WebInputView.default);

export async function getPurchasePrice(type = CONSOLE) {
  const inputView = getView(type);
  const lottoPurchasePrice = await inputView.enterPurchasePrice();
  PurchasePriceValidator.validate(Number(lottoPurchasePrice));
  const lottoCount = lottoPurchasePrice / PURCHASE_PRICE.UNIT;
  return { lottoPurchasePrice, lottoCount };
}

export async function getWinningNumbers(type = CONSOLE) {
  const inputView = getView(type);
  const winningNumbers = await inputView.enterWinningNumbers();
  const splittedWinningNumbers = winningNumbers.split(SEPARATOR).map(Number);
  WinningNumbersValidator.validate(splittedWinningNumbers);
  return splittedWinningNumbers;
}

export async function getBonusNumber(winningNumbers, type = CONSOLE) {
  const inputView = getView(type);
  const bonusNumber = await inputView.enterBonusNumber();
  const transformedBonusNumber = Number(bonusNumber);
  BonusNumberValidator.validate(transformedBonusNumber, winningNumbers);
  return transformedBonusNumber;
}

export async function getRestart(type = CONSOLE) {
  const inputView = getView(type);
  const restartInput = await inputView.enterRestart();
  RestartValidator.validate(restartInput);
  return restartInput;
}
