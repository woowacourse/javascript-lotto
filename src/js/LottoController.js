import LottoView from './LottoView.js';
import { NUMBERS } from './constants.js';
import Lotto from './Lotto.js';

export default class LottoController {
  init() {
    this.lottoView = new LottoView();
    this.lottoView.init();
    this.bindEvents();
    this.lottos = [];
  }

  bindEvents() {
    this.lottoView.inputPriceView
      .querySelector('#input-price-btn')
      .addEventListener('click', () => this.inputPriceHandler());

    this.lottoView.purchasedLottos
      .querySelector('#lotto-switch')
      .addEventListener('click', () => {
        this.toggleSwitchHandler();
      });
  }

  createLottos(lottoCount) {
    this.lottos = Array.from({ length: lottoCount }, () => {
      const lotto = new Lotto();
      lotto.initNumbers();
      return lotto;
    });
  }

  inputPriceHandler() {
    const inputPrice = this.lottoView.inputPriceView.querySelector(
      '#input-price'
    ).value;

    //TODO : lottoCount validation
    const lottoCount = Math.floor(inputPrice / NUMBERS.LOTTO_UNIT);

    this.createLottos(lottoCount);
    this.lottoView.showLottoView();
    this.lottoView.renderTotalLottoCount(lottoCount);
    this.lottoView.renderLottoIcons(this.lottos);
  }

  toggleSwitchHandler() {
    const $lottoIconsDiv = this.lottoView.purchasedLottos.querySelector(
      '#lotto-icons'
    );

    $lottoIconsDiv.checked = !$lottoIconsDiv.checked;
    const isSwitchOn = $lottoIconsDiv.checked; // 초기값은 false

    if (isSwitchOn) {
      $lottoIconsDiv.classList.add('flex-col');
      this.lottoView.showLottoDetailView();
    } else {
      $lottoIconsDiv.classList.remove('flex-col');
      this.lottoView.hideLottoDetailView();
    }
  }
}
