import HomePage from './view/HomePage';

import LottoGameController from './controller/LottoGameController';

class App {
  $homePage;

  $target;

  #lottoGameController;

  constructor($target) {
    this.$target = $target;
    this.$homePage = new HomePage(this.$target);
    this.$homePage.render();

    this.#lottoGameController = new LottoGameController(this.$target);

    this.$target.addEventListener('restart', () => this.handleRestart());
  }

  handleRestart() {
    this.$homePage.render();
    this.#lottoGameController.renderCheckWinningSection();
  }
}

export default App;
