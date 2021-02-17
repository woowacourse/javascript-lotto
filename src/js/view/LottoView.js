/* eslint-disable max-lines-per-function */

import { $, show } from '../util/index.js';

export class LottoView {
  renderLottoSection(lottos) {
    $('#lotto-count').innerText = `${lottos.length}`;
    $('#lotto-container').innerHTML = lottoTemplate(lottos);
    show($('#lotto-section'), $('#lotto-result-form'));

    function lottoTemplate(lottos) {
      return lottos.reduce((html, lotto) => {
        return (html += ` 
          <div class="lotto-wrapper d-flex items-start">
            <span class="lotto mx-1 text-4xl">🎟️ </span>
            <span class="lotto-numbers mx-1 text-2xl d-none">
              ${lotto.numbers}
            </span>
          </div>
        `);
      }, '');
    }
  }
}
