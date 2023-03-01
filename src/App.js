import HomePage from './view/HomePage/index';

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
    this.$target.addEventListener('keydown', (e) =>
      this.handleEscapeKeydown(e)
    );
  }

  handleRestart() {
    this.$homePage.render();
    this.#lottoGameController.renderCheckWinningSection();
  }

  handleEscapeKeydown(e) {
    if (e.key !== 'Escape') return;

    this.#lottoGameController.closeResultModal();
  }
}

export default App;
