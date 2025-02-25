import readLineAsync from '../View/InputView.js';
import INPUT_MESSAGE from '../constants/InputMessage.js';

export async function getConsolePurchasePrice() {
  return await readLineAsync(INPUT_MESSAGE.getPurchasePrice);
}

export function getUIPurchasePrice() {
  const inputElement = document.getElementById('purchase-price');
  return inputElement ? inputElement.value : null;
}

export async function getConsoleWinningNumber() {
  return await readLineAsync(INPUT_MESSAGE.getWinningNumber);
}

export function getUIWinningNumber() {
  const winningNumbers = Array.from(
    document.getElementsByClassName('num-input'),
  );
  return winningNumbers.map((input) => input.value.trim()).join(',');
}
