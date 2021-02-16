import { $ } from './util/dom.js';
import Lotto from './object/Lotto.js';

export default class LottoController {
  constructor(lottoUI) {
    this.lottoUI = lottoUI;
    this.lottos = [];
  }

  init() {
    this.lottoUI.initUI();
    this.initEventListener();
  }

  initEventListener() {
    $('#app').addEventListener('click', event => {
      if (event.target.closest('.money-input-button')) {
        this.handleMoneyInputButton();
      }
    });
  }

  handleMoneyInputButton() {
    this.makeLottos();
    this.lottoUI.renderCheckLottoUI(this.lottos.length);
  }

  makeLottos() {
    const moneyInput = $('.money-input').value;
    const lottoAmount = Math.floor(Number(moneyInput) / 1000);

    for (let i = 0; i < lottoAmount; i++) {
      const lotto = new Lotto();
      lotto.setNumbers();
      this.lottos.push(lotto);
    }
  }
}