import LottoPurchaseForm from './LottoPurchaseForm';
import WinningNumbersSubmitForm from './WinningNumbersSubmitForm';

import { $ } from '../../utils/dom';

class CheckWinningSection {
  #template = /* html */ `
  <div class="container">
    <h2 class="title">🎱 내 번호 당첨 확인 🎱</h2>
    <div class="lotto-purchase-form-container"></div>
    <ul class="lotto-list"></ul>
    <div class="winning-numbers-submit-form-container"></div>
  </div>
  `;

  $target;

  constructor($target) {
    this.$target = $target;
  }

  render() {
    this.$target.replaceChildren();
    this.$target.insertAdjacentHTML('afterbegin', this.#template);
    new LottoPurchaseForm($('.lotto-purchase-form-container')).render();
  }

  renderLottos(lottos) {
    $('.lotto-list').replaceChildren();
    $('.lotto-list').insertAdjacentHTML(
      'afterbegin',
      `<p>총 ${
        lottos.length
      }개를 구매하였습니다.</p>${this.createLottoListTemplate(lottos)}`
    );
  }

  createLottoListTemplate(lottos) {
    return lottos
      .map((lotto) => `<li>🎟️ ${lotto.numbers.join(', ')}<li>`)
      .join('');
  }

  renderWinningNumbersForm() {
    new WinningNumbersSubmitForm(
      $('.winning-numbers-submit-form-container')
    ).render();
  }
}

export default CheckWinningSection;
