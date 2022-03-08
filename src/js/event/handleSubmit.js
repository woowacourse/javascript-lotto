import {
  DOM,
  $lottoPriceInput,
  $lottoPriceSubmitButton,
} from '../utils/dom.js';

import { drawLotto } from '../core/drawLotto.js';
import { getLottoPrice, checkLottoPrice } from '../core/checkLottoPrice.js';

import {
  renderLastLottoNumber,
  renderBoughtLottoList,
} from '../views/render.js';

export const handleSubmit = function (e) {
  const eventTarget = e.target;
  e.preventDefault();

  if (DOM.hasClass(eventTarget, 'lotto-price-input-form')) {
    handleDrawLotto.call(this);
  }
};

const handleDrawLotto = function () {
  const lottoPrice = checkLottoPrice(getLottoPrice());
  if (!lottoPrice) {
    $lottoPriceInput.value = '';
    return;
  }
  this.lottoPrice = lottoPrice;
  $lottoPriceInput.disabled = true;
  $lottoPriceSubmitButton.disabled = true;
  this.lottoList = drawLotto(this.lottoPrice);
  renderBoughtLottoList(this.lottoList.length);
  renderLastLottoNumber();
};
