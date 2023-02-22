import HomePage from './view/HomePage';

class LottoGame {
  #homePage;

  $target;

  constructor($target) {
    this.$target = $target;
    this.#homePage = new HomePage(this.$target);
  }

  }
}

export default LottoGame;
