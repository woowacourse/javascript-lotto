import InputChecker from './validators/InputChecker.js';
import LottoGame from './domains/LottoGame.js';

const $ = selector => document.querySelector(selector);

const App = {
  init: function () {
    this.initEventListeners();
  },

  render: {
    lottos: function (lottos) {
      const innerNumbers = lottos.map(numbers => {
        return `<div id="ticket">
				<span id="lotto-emoji">🎟️</span>
				<div id="lotto-numbers">${numbers.join(', ')}</div>
			</div>`;
      });

      $('#lottos-container').innerHTML = `
			<div id="lottos-amount">
				<span>총 ${lottos.length}개를 구매하였습니다.</span>
			</div>
			<div id="lottos">
				${innerNumbers.join('')}
			</div>`;
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
  },
};

const app = App;
app.init();
