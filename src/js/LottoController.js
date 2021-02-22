import LottoView from './LottoView.js';
import Lotto from './Lotto.js';
import { LOTTO_NUMBERS, ALERT_MESSAGES } from '../js/utils/constants.js';
import { isCorrectPurchaseUnit } from './utils/validatePrice.js';
import { $ } from './utils/dom.js';

import WinningNumberInput from './views/WinningNumberInput.js';
import InputPriceView from './views/InputPriceView.js';
export default class LottoController {
  constructor() {
    this.lottoView = new LottoView();
    this.inputPriceView = new InputPriceView($('#input-price-form'));
    this.winningNumberInput = new WinningNumberInput($('#input-lotto-nums'));
    this.lottos = [];
  }

  init() {
    this.inputPriceView.show().resetInputPrice();
    this.lottoView.init();
    this.winningNumberInput.hide();
    this.bindEvents();
  }

  bindEvents() {
    this.inputPriceView.on('submitPrice', e =>
      this.inputPriceHandler(e.detail)
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

  inputPriceHandler(inputPrice) {
    if (!isCorrectPurchaseUnit(inputPrice)) {
      this.inputPriceView.resetInputPrice();
      alert(ALERT_MESSAGES.INCORRECT_UNIT);
      return;
    }

    this.createLottos(inputPrice / LOTTO_NUMBERS.LOTTO_UNIT);
    this.winningNumberInput.show();
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
