import { $ } from './utils/dom.js';
import Lotto from './objects/Lotto.js';
import { ALERT_MESSAGES, LOTTO_SETTINGS, DOM_SELECTORS } from './utils/constants.js';
import { isMoneyNotInteger } from './utils/validation.js';

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
    $(DOM_SELECTORS.MONEY_FORM).addEventListener('submit', (event) => {
      event.preventDefault();
      this.handleMoneyInputButton();
    });

    $(DOM_SELECTORS.APP).addEventListener('click', event => {
      if (event.target.closest(DOM_SELECTORS.CHECK_LOTTO_SWITCH)) {
        this.handleCheckLottoSwitch();
      }
    });
  }

  handleMoneyInputButton() {
    const moneyInput = Number($(DOM_SELECTORS.MONEY_FORM_INPUT).value);
    if (moneyInput < LOTTO_SETTINGS.LOTTO_PRICE) {
      alert(ALERT_MESSAGES.UNDER_MIN_PRICE);
      return;
    }
    if (isMoneyNotInteger(moneyInput)) {
      alert(ALERT_MESSAGES.NOT_INTEGER_PRICE);
      return;
    }

    this.makeLottos(moneyInput);
    const lottoTickets = this.lottos.map(lotto => lotto.numbers);
    this.lottoUI.renderCheckLottoUI(lottoTickets);
  }

  makeLottos(moneyInput) {
    const lottoAmount = Math.floor(moneyInput / LOTTO_SETTINGS.LOTTO_PRICE);

    for (let i = 0; i < lottoAmount; i++) {
      const lotto = new Lotto();
      lotto.createNumbers();
      this.lottos.push(lotto);
    }
  }

  handleCheckLottoSwitch() {
    this.lottoUI.toggleLottoNumbers();
  }
}
