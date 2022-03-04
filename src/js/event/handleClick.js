import { DOM, $app, $modal } from '../utils/dom.js';

import { toggleButton } from '../core/toggleButton.js';
import {
  checkWinningNumberList,
  getWinningNumbers,
} from '../core/checkWinningNumbers.js';
import {
  getWinningCount,
  getEarningRate,
  getOutputMoney,
} from '../core/getModalInfo.js';

import { renderOpenResultModal } from '../views/render.js';

export const handleClick = function (e) {
  const eventTarget = e.target;

  if (DOM.hasClass(eventTarget, 'onoff-switch')) {
    toggleButton.call(this);
  }
  if (DOM.hasClass(eventTarget, 'result-button')) {
    openResultModal.call(this);
  }
  if (DOM.hasClass(eventTarget, 'modal-window-close-button')) {
    closeModal();
  }
  if (DOM.hasClass(eventTarget, 'restart-button')) {
    window.location.reload();
  }
};

const closeModal = () => {
  $modal.remove();
  DOM.toggleClass($app, 'disabled');
};

const openResultModal = function () {
  const winningNumberList = checkWinningNumberList(getWinningNumbers());
  if (!winningNumberList) {
    return;
  }
  this.winningNumberList = winningNumberList;
  const winningCount = getWinningCount(this.lottoList, this.winningNumberList);
  const earningRate = getEarningRate(
    this.lottoList.length,
    getOutputMoney(winningCount),
  );

  renderOpenResultModal(winningCount, earningRate);
};
