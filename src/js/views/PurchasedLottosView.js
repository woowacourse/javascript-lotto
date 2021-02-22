import View from './View.js';
import { $, $$ } from '../utils/dom.js';

export default class PurchasedLottosView extends View {
  constructor($element) {
    super($element);
    this.bindToggleSwitchEvent();
  }

  bindToggleSwitchEvent() {
    $('#lotto-switch').addEventListener('click', () => {
      this.toggleSwitchHandler();
    });
  }

  toggleSwitchHandler() {
    const $lottoIconsDiv = $('#lotto-icons');

    $lottoIconsDiv.checked = !$lottoIconsDiv.checked;
    const isSwitchOn = $lottoIconsDiv.checked;

    if (isSwitchOn) {
      $lottoIconsDiv.classList.add('flex-col');
      this.showLottoDetailView();
    } else {
      $lottoIconsDiv.classList.remove('flex-col');
      this.hideLottoDetailView();
    }
  }

  showLottoDetailView() {
    Array.from($$('.lotto-detail')).forEach(lottoDetail => {
      lottoDetail.style.display = 'inline';
    });
  }

  hideLottoDetailView() {
    Array.from($$('.lotto-detail')).forEach(lottoDetail => {
      lottoDetail.style.display = 'none';
    });
  }

  renderTotalLottoCount(count) {
    $('#total-purchased').innerText = count;
  }

  renderLottoIcons(lottos) {
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
