import View from './View.js';
import { $, $$ } from '../utils/dom.js';

export default class PurchasedResultView extends View {
  constructor($element) {
    super($element);
    this.$lottoIconsDiv = $('#lotto-icons');
    this.$toggleSwitch = $('#lotto-switch');
    this.bindToggleSwitchEvent();
  }

  resetToggleSwitch() {
    this.$toggleSwitch.checked = false;
    this.hideLottoDetailView();
  }

  bindToggleSwitchEvent() {
    this.$toggleSwitch.addEventListener('click', () => {
      this.toggleSwitchHandler();
    });
  }

  toggleSwitchHandler() {
    if (this.$toggleSwitch.checked) {
      this.showLottoDetailView();
    } else {
      this.hideLottoDetailView();
    }
  }

  showLottoDetailView() {
    this.$lottoIconsDiv.classList.add('flex-col');
    $$('.lotto-detail').forEach(lottoDetail => {
      lottoDetail.style.display = 'inline';
    });
  }

  hideLottoDetailView() {
    this.$lottoIconsDiv.classList.remove('flex-col');
    $$('.lotto-detail').forEach(lottoDetail => {
      lottoDetail.style.display = 'none';
    });
  }

  renderLottos(lottos) {
    this.resetToggleSwitch();

    $('#total-purchased').innerText = lottos.length;
    $('#lotto-icons').innerHTML = this.createLottoIcons(lottos);

    this.hideLottoDetailView();
  }

  createLottoIcons(lottos) {
    return lottos
      .map(
        lotto => `
          <li class="mx-1 text-4xl lotto-wrapper">
            <span class="lotto-icon">🎟️ </span>
            <span class="lotto-detail">${lotto.numberDetailString}</span>
          </li>
        `
      )
      .join('');
  }
}
