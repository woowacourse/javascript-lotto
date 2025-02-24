import readLineAsync from '../View/InputView.js';
import INPUT_MESSAGE from '../constants/InputMessage.js';

// 콘솔 입력 방식
export async function getConsoleInput() {
  return await readLineAsync(INPUT_MESSAGE.getPurchasePrice);
}

// UI 입력 방식
export function getUIInput() {
  const inputElement = document.getElementById('purchase-price');
  console.log(inputElement);
  return inputElement ? inputElement.value : null;
}
