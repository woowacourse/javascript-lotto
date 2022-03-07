import { $ } from '../utils/dom.js';

export function initLottoPriceInputElement() {
  $('.lotto-price-input').value = '';
}

export function initLottoWinningNumberElement(lottoWinningInputElementList) {
  lottoWinningInputElementList.forEach(input => {
    input.value = '';
  });
}
