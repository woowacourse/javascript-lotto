import LottoPurchaseForm from './LottoPurchaseForm';

import { $ } from '../../utils/dom';

class CheckWinningSection {
  #template = /* html */ `
  <div class="container">
    <h2>🎱 내 번호 당첨 확인 🎱</h2>
  </div>
  `;

  #lottoListTemplate = /* html */ `
  <ul class="lotto-list">
    <p>총 7개를 구매하였습니다.</p>
    <li class="lotto">🎟️ 12, 28, 22, 37, 19, 23</li>
    <li class="lotto">🎟️ 12, 28, 22, 37, 19, 23</li>
    <li class="lotto">🎟️ 12, 28, 22, 37, 19, 23</li>
    <li class="lotto">🎟️ 12, 28, 22, 37, 19, 23</li>
    <li class="lotto">🎟️ 12, 28, 22, 37, 19, 23</li>
    <li class="lotto">🎟️ 12, 28, 22, 37, 19, 23</li>
    <li class="lotto">🎟️ 12, 28, 22, 37, 19, 23</li>
  </ul>
  `;

  #lottoPurchaseForm;

  $target;

  constructor($target) {
    this.$target = $target;
    this.render();

    this.#lottoPurchaseForm = new LottoPurchaseForm($('.container'));
  }

  render() {
    this.$target.innerHTML = this.#template;
  }
}

export default CheckWinningSection;
