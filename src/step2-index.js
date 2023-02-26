import '../style.css';
import InputChecker from './web/validators/InputChecker.js';
import LottoGame from './web/domains/LottoGame.js';
import { $ } from './web/utils/dom.js';
import { getFormData } from './web/utils/form.js';
import LottoRenderer from './web/views/LottoRenderer.js';
import URL from './web/constants/url.js';

const App = {
  init() {
    this.initHeaderEventListener();
    this.initPriceFormEventListeners();
  },

  initHeaderEventListener() {
    $('#header-button').addEventListener(
      'click',
      () => (window.location = `${URL.DOMAIN}${URL.HOME}`)
    );
  },

  initPriceFormEventListeners() {
    $('#price-form').addEventListener('submit', event => {
      event.preventDefault();
      LottoGame.initProps();

      if (!this.purchaseLottos(event.target)) {
        return;
      }

      LottoRenderer.renderLottos(LottoGame.getLottos());
      LottoRenderer.renderWinningNumbers();
      this.initWinningNumbersEventListener();
    });
  },

  purchaseLottos(target) {
    const fields = getFormData(target);
    if (!fields) {
      return;
    }

    const price = InputChecker.checkLottoPrice(fields.price);
    if (!price) {
      return;
    }

    LottoGame.initLotto(price);
    return true;
  },

  initWinningNumbersEventListener() {
    $('#winning-numbers-form').addEventListener('submit', event => {
      event.preventDefault();

      if (!this.registerWinningNumbers(event.target)) {
        return;
      }

      LottoRenderer.renderDialog();
      this.initDialogEventListener();

      LottoRenderer.renderResult(LottoGame.getResult());
      this.initResultEventListener();
    });
  },

  registerWinningNumbers(target) {
    const fields = getFormData(target);
    if (!fields) {
      return;
    }

    const luckyNumbers = InputChecker.checkLuckyNumbers(
      Array.from(
        { length: 6 },
        (_, index) => fields[`lucky-number-0${index + 1}`]
      )
    );

    if (!luckyNumbers) {
      return;
    }

    const bonusNumber = InputChecker.checkBonusNumber(
      fields['bonus-number'],
      luckyNumbers
    );

    if (!bonusNumber) {
      return;
    }

    LottoGame.initWinningNumbers({ luckyNumbers, bonusNumber });

    return true;
  },

  initDialogEventListener() {
    $('dialog').addEventListener('click', event => {
      if (event.target.nodeName === 'DIALOG') {
        $('dialog').close();
      }
    });

    $('#exit-button').addEventListener('click', () => $('dialog').close());
  },

  initResultEventListener() {
    $('#retry-button').addEventListener('click', () =>
      window.location.reload()
    );
  },
};

const app = App;
app.init();
