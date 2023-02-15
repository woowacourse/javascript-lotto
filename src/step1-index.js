import Amount from './view/components/Amount.js';
import LottoList from './view/components/LottoList.js';

const result = {};
function initState(initialValue = {}) {
  result.state = initialValue;
  const setState = (newState) => {
    result.state = { ...result.state, ...newState };
  };

  result.setState = setState;

  return result;
}
class App {
  #state = initState({
    total: null,
  });

  async play() {
    await this.render(new Amount(this.#state.setState));
    await this.render(new LottoList(this.#state.state.total));
  }

  async render(component) {
    await component.read();
    component.render();
  }
}

const app = new App();
(async () => {
  await app.play();
})();
