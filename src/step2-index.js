/* eslint-disable max-lines-per-function */
/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import './css/theme.css';
import './css/style.css';
import './css/modal.css';

import LottoController from './controller/step2-LottoController';

const lottoController = new LottoController();

document.addEventListener('DOMContentLoaded', function () {
  const purchaseForm = document.getElementById('purchaseInputSection');
  const winningAndBonusForm = document.getElementById('winningAndBonusSection');
  const modalContainer = document.getElementById('modalContainer');
  const modalCloseButton = document.getElementById('modalCloseButton');
  const resetButton = document.getElementById('resetButton');

  let lottos = [];

  purchaseForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    const purchaseAmount = event.target.elements.purchaseInputField.value;
    lottos = await lottoController.purchaseLottos(purchaseAmount);
  });

  winningAndBonusForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    const winningNumbers = await lottoController.validateWinningNumbers();
    if (winningNumbers === null) {
      return;
    }

    const bonusNumber = await lottoController.validateBonusNumber(winningNumbers);
    if (bonusNumber === null) {
      return;
    }

    await lottoController.executeGame({ lottos, winningNumbers, bonusNumber });
    modalContainer.style.display = 'flex';
  });

  modalContainer.addEventListener('click', function () {
    modalContainer.style.display = 'none';
  });

  modalCloseButton.addEventListener('click', function () {
    modalContainer.style.display = 'none';
  });

  resetButton.addEventListener('click', function () {
    modalContainer.style.display = 'none';
    window.location.reload();
  });
});
