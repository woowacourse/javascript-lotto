import InputChecker from './web/validators/InputChecker.js';

const $ = selector => document.querySelector(selector);

function App() {
  this.init = () => {
    render();
    initEventListeners();
  };

  const render = () => {};

  const initEventListeners = () => {
    $('#price-form').addEventListener('submit', event =>
      event.preventDefault()
    );

    $('#price-button').addEventListener('click', () => purchaseLottos());
  };

  const purchaseLottos = () => {
    InputChecker.checkLottoPrice($('#price-input').value);
  };
}

const app = new App();
app.init();
