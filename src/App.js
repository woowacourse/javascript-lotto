import HomePage from './view/HomePage';

import LottoPurchaseController from './controller/LottoPurchaseController';

class App {
  #lottoPurchaseController;

  $target;

  constructor($target) {
    this.$target = $target;

    new HomePage(this.$target).render();

    this.#lottoPurchaseController = new LottoPurchaseController(this.$target);
  }
}

export default App;
