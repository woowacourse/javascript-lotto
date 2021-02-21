/* eslint-disable max-lines-per-function */

import { $ } from '../util/index.js';

export class LottoView {
  renderLottoSection(lottos) {
    $('#lotto-count').innerText(`${lottos.length}`);
    $('#lotto-container').innerHTML(lottoTemplate(lottos));
    $('#lotto-section').show();
    $('#lotto-result-form').show();

    function lottoTemplate(lottos) {
      return lottos.reduce((html, lotto) => {
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
}
