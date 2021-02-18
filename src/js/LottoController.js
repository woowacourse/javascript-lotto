import LottoView from './LottoView.js';
import Lotto from './Lotto.js';
import { NUMBERS } from '../js/utils/constants.js';
import priceValidator from '../js/utils/priceValidator.js';
import { $ } from './utils/dom.js';

export default class LottoController {
  constructor() {
    this.lottoView = new LottoView();
    this.lottos = [];
  }

  init() {
    this.lottoView.init();
    this.bindEvents();
  }

  bindEvents() {
    this.lottoView.inputPriceView.addEventListener('submit', e =>
      this.inputPriceHandler(e)
    );

    $('#lotto-switch').addEventListener('click', () => {
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

    const inputPrice = $('#input-price').value;
    if (!this.isValidPrice(inputPrice)) {
      this.lottoView.resetInputPrice();
      return;
    }

    this.createLottos(inputPrice / NUMBERS.LOTTO_UNIT);
    this.lottoView.showLottoView();
    this.lottoView.renderTotalLottoCount(this.lottos.length);
    this.lottoView.renderLottoIcons(this.lottos);
  }

  isValidPrice(price) {
    const errorMessage = priceValidator(price);
    if (!errorMessage) return true;

    alert(errorMessage);
    return false;
  }

  toggleSwitchHandler() {
    const $lottoIconsDiv = $('#lotto-icons');

    $lottoIconsDiv.checked = !$lottoIconsDiv.checked;
    const isSwitchOn = $lottoIconsDiv.checked;

    if (isSwitchOn) {
      $lottoIconsDiv.classList.add('flex-col');
      this.lottoView.showLottoDetailView();
    } else {
      $lottoIconsDiv.classList.remove('flex-col');
      this.lottoView.hideLottoDetailView();
    }
  }
}
