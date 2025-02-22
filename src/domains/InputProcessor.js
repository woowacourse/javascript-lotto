import { PURCHASE_PRICE, SEPARATOR } from '../constants/CONFIGURATIONS.js';
import { BonusNumberValidator } from '../validators/BonusNumberValidator.js';
import { PurchasePriceValidator } from '../validators/PurchasePriceValidator.js';
import RestartValidator from '../validators/RestartValidator.js';
import { WinningNumbersValidator } from '../validators/WinningNumbersValidator.js';
import InputView from '../views/InputView.js';

export async function getPurchasePrice() {
  const lottoPurchasePrice = await InputView.enterPurchasePrice();
  PurchasePriceValidator.validate(Number(lottoPurchasePrice));
  const lottoCount = lottoPurchasePrice / PURCHASE_PRICE.UNIT;
  return { lottoPurchasePrice, lottoCount };
}

export async function getWinningNumbers() {
  const winningNumbers = await InputView.enterWinningNumbers();
  const splittedWinningNumbers = winningNumbers.split(SEPARATOR).map(Number);
  WinningNumbersValidator.validate(splittedWinningNumbers);
  return splittedWinningNumbers;
}

export async function getBonusNumber(winningNumbers) {
  const bonusNumber = await InputView.enterBonusNumber();
  const transformedBonusNumber = Number(bonusNumber);
  BonusNumberValidator.validate(transformedBonusNumber, winningNumbers);
  return transformedBonusNumber;
}

export async function getRestart() {
  const restartInput = await InputView.enterRestart();
  RestartValidator.validate(restartInput);
  return restartInput;
}
