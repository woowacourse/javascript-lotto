/* eslint-disable max-lines-per-function */
/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import './css/theme.css';
import './css/style.css';

import LottoController from './controller/step2-LottoController';

const lottoController = new LottoController();

window.onload = function () {
  const purchaseForm = document.getElementById('purchaseInputSection');

  purchaseForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    const purchaseAmount = document.getElementById('purchaseInputField').value;
    await lottoController.purchaseLottos(purchaseAmount);
  });

  const winningAndBonusForm = document.getElementById('winningAndBonusSection');

  winningAndBonusForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    await lottoController.runGame();
  });
};
