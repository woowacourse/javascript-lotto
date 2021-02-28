/* eslint-disable max-lines-per-function */

import { $ } from '../util/index.js';

export class LottoView {
  renderLottoSection(lottos) {
    this.$lottoSection = $('#lotto-section');
    this.$lottoResultForm = $('#lotto-result-form');

    $('#lotto-count').innerText(`${lottos.length}`);
    $('#lotto-container').innerHTML(lottoTemplate(lottos));
    this.$lottoSection.show();
    this.$lottoResultForm.show();

    function lottoTemplate(lottos) {
      return lottos.reduce((html, lotto, idx) => {
        return (html += ` 
          <div class="lotto-wrapper d-flex items-start">
            <span class="lotto mx-1 text-4xl">🎟️ </span>
            <span class="lotto-numbers mx-1 text-2xl d-none">
              ${lotto.numbers.join(', ')}
            </span>
          </div>
        `);
      }, '');
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
