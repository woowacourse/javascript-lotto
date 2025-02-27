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

export async function getConsoleBonusNumber() {
  return await readLineAsync(INPUT_MESSAGE.getBonusNumber);
}

export function getUIBonusNumber() {
  const bonusNumber = document.getElementById('bonusnum-input');

  return bonusNumber.value;
}

export async function getConsoleUserRetry() {
  return await readLineAsync(INPUT_MESSAGE.askUserRetry);
}

export async function getUIUserRetry() {
  return new Promise((resolve, reject) => {
    const retryButton = document.getElementById('retry-button');

    const handleClick = (event) => {
      event.preventDefault();
      retryButton.removeEventListener('click', handleClick);
      resolve('y');
    };

    retryButton.addEventListener('click', handleClick);
  });
}
