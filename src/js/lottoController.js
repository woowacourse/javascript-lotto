import { $ } from './utils/dom.js';
import Lotto from './objects/Lotto.js';
import { ALERT_MESSAGES, LOTTO_SETTINGS, DOM_IDS, DOM_CLASSES } from './utils/constants.js';
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
    $(`#${DOM_IDS.APP}`).addEventListener('submit', event => {
      event.preventDefault();
      if (event.target.closest(`.${DOM_CLASSES.MONEY_FORM}`)) {
        this.handleMoneyInput();
      }
      if (event.target.closest(`.${DOM_CLASSES.RESULT_INPUT_FORM}`)) {
        this.handleResultInput();
      }
    });

    $(`#${DOM_IDS.APP}`).addEventListener('click', event => {
      if (event.target.closest(`.${DOM_CLASSES.LOTTO_SWITCH}`)) {
        this.handleCheckLottoSwitch();
      }
    });
  }

  handleMoneyInput() {
    const moneyInput = Number($(`.${DOM_CLASSES.MONEY_FORM_INPUT}`).value);
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
    this.lottoUI.renderResultInputUI()
  }

  handleResultInput() {
    // 당첨 번호를 저장한다.
    // 모달창을 띄운다.
    $(`.${DOM_CLASSES.MODAL}`).classList.add('open');
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
