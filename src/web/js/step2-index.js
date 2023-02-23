import InputChecker from './validators/InputChecker.js';
import LottoGame from './domains/LottoGame.js';
import tagGenerator from './utils/tagGenerators.js';
import LINK from './constants/link.js';
import { $, $$ } from './utils/dom.js';

const App = {
  init: function () {
    this.initEventListeners();
  },

  render: {
    lottos: lottos => {
      $('#lottos').innerHTML = tagGenerator.generateLottos(lottos);
    },

    winningNumbers: () => {
      $('#winning-numbers').innerHTML =
        tagGenerator.generateWinningNumberTags();

      $('#winning-numbers-form').addEventListener('submit', event =>
        event.preventDefault()
      );
    },
  },

  initEventListeners: function () {
    $('#price-form').addEventListener('submit', event =>
      event.preventDefault()
    );

    $('#header-button').addEventListener(
      'click',
      () => (window.location = LINK.HOME)
    );

    $('#price-form').addEventListener('submit', event =>
      this.purchaseLottos(event)
    );
  },

  purchaseLottos: function (event) {
    const formData = new FormData(event.target);
    const fields = Object.fromEntries(formData);
    const price = InputChecker.checkLottoPrice(fields.price);
    if (!price) {
      return;
    }
    LottoGame.init(price);

    this.render.lottos(LottoGame.getLottos());
    this.render.winningNumbers();
    $('#winning-numbers-form').addEventListener('submit', event =>
      this.calculateResult(event)
    );
  },

  calculateResult: function (event) {
    const formData = new FormData(event.target);
    const fields = Object.fromEntries(formData);
    const luckyNumbersInput = Array.from(
      { length: 6 },
      (_, index) => fields[`lucky-number-${index + 1}`]
    );
    const bonusNumberInput = fields['bonus-number'];
    const luckyNumbers = InputChecker.checkLuckyNumbers(luckyNumbersInput);
    if (!luckyNumbers) {
      return;
    }
    const bonusNumber = InputChecker.checkBonusNumber(
      bonusNumberInput,
      luckyNumbers
    );
    if (!bonusNumber) {
      return;
    }
  },
};

const app = App;
app.init();
