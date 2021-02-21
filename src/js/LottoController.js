import LottoView from './LottoView.js';
import Lotto from './Lotto.js';
import { LOTTO_NUMBERS, ALERT_MESSAGES } from '../js/utils/constants.js';
import { isCorrectPurchaseUnit } from './utils/validatePrice.js';
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
      return lotto;
    });
  }

  inputPriceHandler(e) {
    e.preventDefault();

    const inputPrice = e.target.elements.inputPrice.value;
    if (!isCorrectPurchaseUnit(inputPrice)) {
      this.lottoView.resetInputPrice();
      alert(ALERT_MESSAGES.INCORRECT_UNIT);
      return;
    }

    this.createLottos(inputPrice / LOTTO_NUMBERS.LOTTO_UNIT);
    this.lottoView.showLottoView();
    this.lottoView.renderTotalLottoCount(this.lottos.length);
    this.lottoView.renderLottoIcons(this.lottos);
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
