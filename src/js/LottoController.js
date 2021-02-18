import LottoView from './LottoView.js';
import Lotto from './Lotto.js';
import { NUMBERS } from '../js/utils/constants.js';
import priceValidator from '../js/utils/priceValidator.js';

export default class LottoController {
  init() {
    this.lottoView = new LottoView();
    this.lottoView.init();
    this.bindEvents();
    this.lottos = [];
  }

  bindEvents() {
    this.lottoView.inputPriceView.addEventListener('submit', e =>
      this.inputPriceHandler(e)
    );

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

  inputPriceHandler(e) {
    e.preventDefault();
    const inputPrice = this.lottoView.inputPriceView.querySelector(
      '#input-price'
    ).value;

    const errorMessage = priceValidator(inputPrice);
    if (errorMessage) {
      alert(errorMessage);
      return this.lottoView.resetInputPrice();
    }

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
