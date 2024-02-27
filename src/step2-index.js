/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import { inputMoneyHandler } from './step2/handlers/inputMoneyHandler.js';
import { inputWinningLottoNumbersHandler } from './step2/handlers/inputWinningLottoNumbersHandler.js';
import { statisticsResultHandler, modalCloseHandler } from './step2/handlers/statisticsResultHandler.js';
import { reloadPage } from './step2/handlers/uiUtils.js';

document.addEventListener('DOMContentLoaded', () => {
  const moneyInputForm = document.getElementById('moneyInputForm');
  const winningLottoInputs = document.querySelectorAll('.winningLottoInput');
  const winningLottoForm = document.getElementById('winningLottoForm');
  const modalCloseButton = document.getElementById('modalCloseButton');
  const winningCounts = document.querySelectorAll('.winningCount');
  const retrySelectButton = document.getElementById('retrySelectButton');

  moneyInputForm.addEventListener('submit', inputMoneyHandler);
  winningLottoInputs.forEach((input, index) => {
    inputWinningLottoNumbersHandler({ input, index, winningLottoInputs });
  });
  winningLottoForm.addEventListener('submit', (e) => statisticsResultHandler({ e, winningCounts }));
  modalCloseButton.addEventListener('click', modalCloseHandler);
  retrySelectButton.addEventListener('click', reloadPage);
});
