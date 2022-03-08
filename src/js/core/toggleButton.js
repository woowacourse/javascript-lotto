import { DOM, $ } from '../utils/dom.js';

import {
  renderToggledBoughtLottoItem,
  renderBoughtLottoItem,
} from '../views/render.js';

export const toggleButton = function () {
  const $purchasedLottoMain = $('.bought-lotto-main');
  const $checkBox = $('.checkbox');
  const isTurnOn = DOM.toggleClass($purchasedLottoMain, 'is-active');

  if (isTurnOn) {
    $checkBox.checked = false;
    renderToggledBoughtLottoItem(this.lottoList);
    return;
  }
  renderBoughtLottoItem(this.lottoList.length);
  $checkBox.checked = true;
};
