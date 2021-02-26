import View from './View.js';
import { $, $$ } from '../utils/selector.js';

export default class PurchasedLottosView extends View {
  constructor($element) {
    super($element);
    this.toggleSwitch = $('#lotto-switch');
    this.$lottoIconsDiv = $('#lotto-icons');
    this.bindToggleSwitchEvent();
  }

  bindToggleSwitchEvent() {
    $('#lotto-switch').addEventListener('click', () => {
      this.toggleSwitchHandler();
    });
  }

  toggleSwitchHandler() {
    if (this.toggleSwitch.checked) {
      this.$lottoIconsDiv.classList.add('flex-col');
      this.showLottoDetailView();
    } else {
      this.$lottoIconsDiv.classList.remove('flex-col');
      this.hideLottoDetailView();
    }
  }

  resetToggleSwitch() {
    this.toggleSwitch.checked = false;
    this.$lottoIconsDiv.classList.remove('flex-col');
    this.hideLottoDetailView();
  }

  showLottoDetailView() {
    $$('.lotto-detail').forEach(lottoDetail => {
      lottoDetail.style.display = 'inline';
    });
  }

  hideLottoDetailView() {
    $$('.lotto-detail').forEach(lottoDetail => {
      lottoDetail.style.display = 'none';
    });
  }

  renderLottos(lottos) {
    $('#total-purchased').innerText = lottos.length;
    $('#lotto-icons').innerHTML = this.createLottoIconTemplate(lottos);

    this.hideLottoDetailView();
  }

  createLottoIconTemplate(lottos) {
    return lottos
      .map(
        lotto => `
          <li class="mx-1 text-4xl lotto-wrapper">
            <span class="lotto-icon">🎟️ </span>
            <span class="lotto-detail">${lotto.numberDetail}</span>
          </li>
        `
      )
      .join('');
  }
}
