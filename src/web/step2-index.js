import InputChecker from './validators/InputChecker.js';
import LottoGame from './domains/LottoGame.js';
import MESSAGE from './constant/message.js';
import { RENDER_TICKET } from './util/renderer.js';

const $ = selector => document.querySelector(selector);

const App = {
  init: function () {
    this.initEventListeners();
  },

  render: {
    lottos: lottos => {
      $('#lottos-container').innerHTML = `
			<div id="lottos-amount">
				<span>${MESSAGE.BUY_LOTTO(lottos.length)}</span>
			</div>
			<div id="lottos">
				${RENDER_TICKET(lottos)}
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
