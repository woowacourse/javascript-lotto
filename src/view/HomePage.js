import CheckWinningSection from './CheckWinningSection/index';

import { $ } from '../utils/dom';

class HomePage {
  #template = /* html */ `
  <header>
    <h1>🎱 행운의 로또</h1>
  </header>
  <section class="check-winning-section"></section>
  <footer>
    <p class="copyright">Copyright 2023. woowacourse</p>
  </footer>
  `;

  #checkWinningSection;

  $target;

  constructor($target) {
    this.$target = $target;
    this.render();

    this.#checkWinningSection = new CheckWinningSection(
      $('.check-winning-section')
    );
  }

  render() {
    this.$target.insertAdjacentHTML('afterbegin', this.#template);
  }
}

export default HomePage;
