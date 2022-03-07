import { $ } from '../utils/dom.js';
export function disableLottoPriceInput() {
  $('.lotto-price-input').disabled = true;
  $('.lotto-price-submit-button').disabled = true;
}

export function disableLottoWinningNumberInput(lottoWinningInputElements) {
  lottoWinningInputElements.forEach(input => {
    input.disabled = true;
  });
}
