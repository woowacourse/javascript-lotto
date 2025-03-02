import readLineAsync from '../View/InputView.js';
import INPUT_MESSAGE from '../constants/InputMessage.js';
import SELECTORS from '../constants/Selectors.js';

export async function getConsolePurchasePrice() {
  return await readLineAsync(INPUT_MESSAGE.getPurchasePrice);
}

export async function getConsoleWinningNumber() {
  return await readLineAsync(INPUT_MESSAGE.getWinningNumber);
}

export async function getConsoleBonusNumber() {
  return await readLineAsync(INPUT_MESSAGE.getBonusNumber);
}

export async function getConsoleUserRetry() {
  return await readLineAsync(INPUT_MESSAGE.askUserRetry);
}

export function getUIPurchasePrice() {
  const inputElement = document.getElementById(SELECTORS.INPUT.PURCHASE_PRICE);
  return inputElement ? inputElement.value : null;
}
