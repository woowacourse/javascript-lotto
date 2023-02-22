import InputChecker from './validators/InputChecker.js';
import LottoGame from './domains/LottoGame.js';
import tagGenerator from './util/tagRenderer.js';

const $ = selector => document.querySelector(selector);

const App = {
  init: function () {
    this.initEventListeners();
  },

  render: {
    lottos: lottos => {
      $('#lottos-container').innerHTML = tagGenerator.generateLottos(lottos);
    },

    winningNumbers: () => {
      $('#winning-numbers').innerHTML =
        tagGenerator.generateWinningNumberTags();
    },
  },

  initEventListeners: function () {
    $('#price-form').addEventListener('submit', event =>
      event.preventDefault()
    );

    $('#header-button').addEventListener(
      'click',
      () => (window.location = 'http://127.0.0.1:5500/src/web/html/index.html')
    );

    $('#price-button').addEventListener('click', () => this.purchaseLottos());
  },

  purchaseLottos: function () {
    const price = InputChecker.checkLottoPrice($('#price-input').value);
    if (!price) {
      return;
    }
    LottoGame.init(price);

    this.render.lottos(LottoGame.getLottos());
    this.render.winningNumbers();
  },
};

const app = App;
app.init();
