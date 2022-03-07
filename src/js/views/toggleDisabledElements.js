import { $ } from '../utils/dom.js';
export function toggleDisabledLottoPriceInput() {
  $('.lotto-price-input').disabled = !$('.lotto-price-input').disabled;
  $('.lotto-price-submit-button').disabled = !$('.lotto-price-submit-button')
    .disabled;
}

export function toggleDisabledLottoWinningNumberInput(
  lottoWinningInputElements,
) {
  lottoWinningInputElements.forEach(input => {
    input.disabled = !input.disabled;
  });
}
