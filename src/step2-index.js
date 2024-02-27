/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import { inputMoneyHandler } from './step2/handlers/inputMoneyHandler.js';
import { inputWinningLottoNumbersHandler } from './step2/handlers/inputWinningLottoNumbersHandler.js';

document.addEventListener('DOMContentLoaded', () => {
  const moneyInputForm = document.getElementById('moneyInputForm');
  const winningLottoInputs = document.querySelectorAll('.winningLottoInput');

  moneyInputForm.addEventListener('submit', inputMoneyHandler);
  winningLottoInputs.forEach((input, index) => {
    inputWinningLottoNumbersHandler({ input, index, winningLottoInputs });
  });
});
