/* eslint-disable max-lines-per-function */

import { LOTTO_TYPE_AUTO } from '../constants/index.js';
import { $ } from '../util/index.js';

export class LottoView {
  renderPurchaseSection(money) {
    this.$purchaseSection = $('#purchase-section');
    $('#current-money').innerText(money);
    this.$purchaseSection.show();
  }

  renderLottoSection(lottos) {
    this.$lottoSection = $('#lotto-section');
    this.$lottoResultForm = $('#lotto-result-form');

    $('#lotto-count').innerText(`${lottos.length}`);
    $('#lotto-container').innerHTML(lottoTemplate(lottos));
    this.$lottoSection.show();
    this.$lottoResultForm.show();

    function lottoTemplate(lottos) {
      if ($('#lotto-numbers-toggle-button').isCheckedInput()) {
        return lottos.reduce((html, lotto, idx) => {
          return (html += ` 
            <div class="lotto-wrapper d-flex items-start">
              <span class="lotto mx-1 text-4xl">🎟️ </span>
              <span data-lotto-numbers=${idx} class="mx-1 text-xl font-bold mt-2">
                ${lotto.type === LOTTO_TYPE_AUTO ? '자동' : '수동'} ${lotto.numbers.join(', ')}
              </span>
            </div>
          `);
        }, '');
      } else {
        return lottos.reduce((html, lotto, idx) => {
          return (html += ` 
            <div class="lotto-wrapper d-flex items-start">
              <span class="lotto mx-1 text-4xl">🎟️ </span>
              <span data-lotto-numbers=${idx} class="mx-1 text-xl font-bold d-none mt-2">
              ${lotto.type === LOTTO_TYPE_AUTO ? '자동' : '수동'} ${lotto.numbers.join(', ')}
              </span>
            </div>
          `);
        }, '');
      }
    }
  }

  renderWinningResult({ rankCounts, earningRate }) {
    rankCounts.forEach((count, rank) => {
      rank !== 0 && $(`[data-rank='${rank}']`).innerText(`${count}개`);
    });
    $('#earning-rate').innerText(`${earningRate}`);
  }

  reset() {
    this.$lottoSection.hide();
    this.$lottoResultForm.hide();
  }
}
