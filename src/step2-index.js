import '../style.css';
import InputChecker from './web/validators/InputChecker.js';
import LottoGame from './web/domains/LottoGame.js';
import LINK from './web/constants/link.js';
import { $ } from './web/utils/dom.js';
import { getFormData } from './web/utils/form.js';
import initWinningNumbers from './web/inputUtil/inputs.js';
import {
  renderLottos,
  renderWinningNumbers,
  renderDialog,
  renderResult,
} from './web/views/renderer.js';

const App = {
  result: null,

  init() {
    this.initHeaderEventListener();
    this.initPriceFormEventListeners();
  },

  initHeaderEventListener() {
    $('#header-button').addEventListener(
      'click',
      () => (window.location = LINK.HOME)
    );
  },

  initPriceFormEventListeners() {
    $('#price-form').addEventListener('submit', event =>
      event.preventDefault()
    );

    $('#price-form').addEventListener('submit', event => {
      if (!this.purchaseLottos(event)) {
        return;
      }

      renderLottos(LottoGame.getLottos());
      renderWinningNumbers();
      this.initWinningNumbersEventListener();
    });
  },

  purchaseLottos(event) {
    const fields = getFormData(event.target);
    const price = InputChecker.checkLottoPrice(fields.price);
    if (!price) {
      return;
    }

    LottoGame.init(price);
    return true;
  },

  initWinningNumbersEventListener() {
    $('#winning-numbers-form').addEventListener('submit', event => {
      event.preventDefault();
    });

    $('#winning-numbers-form').addEventListener('submit', event => {
      if (!initWinningNumbers(event)) {
        return;
      }

      renderDialog();
      this.initDialogEventListener();

      if (!this.result) {
        this.result = LottoGame.getResult();
      }
      renderResult(this.result);
      this.initResultEventListener();
    });
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
