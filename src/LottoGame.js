import LottoMachine from './domain/LottoMachine';

import HomePage from './view/HomePage';

class LottoGame {
  #homePage;

  #lottoMachine;

  $target;

  constructor($target) {
    this.$target = $target;
    this.#homePage = new HomePage(this.$target);
    this.$target.addEventListener('purchaseLotto', (e) =>
      this.handlePurchaseLotto(e.detail)
    );
  }

  handlePurchaseLotto(purchasePrice) {
    this.#lottoMachine = new LottoMachine(purchasePrice);
    console.log(this.#lottoMachine.lottos);
  }
}

export default LottoGame;
