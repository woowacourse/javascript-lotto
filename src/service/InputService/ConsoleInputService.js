import readLineAsync from '../../View/InputView.js';
import INPUT_MESSAGE from '../../constants/InputMessage.js';

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
