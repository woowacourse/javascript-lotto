import HomePage from './view/HomePage';

import LottoGameController from './controller/LottoGameController';

class App {
  #lottoGameController;

  $target;

  constructor($target) {
    this.$target = $target;

    new HomePage(this.$target).render();

    this.#lottoGameController = new LottoGameController(this.$target);
  }
}

export default App;
