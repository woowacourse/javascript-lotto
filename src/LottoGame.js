import HomePage from './view/HomePage';

import { $ } from './utils/dom';

class LottoGame {
  #homePage;

  constructor() {
    this.#homePage = new HomePage($('#app'));
  }

  play() {
    this.#homePage.render();
  }
}

export default LottoGame;
