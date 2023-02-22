import HomePage from './view/HomePage';

class LottoGame {
  #homePage;

  $target;

  constructor($target) {
    this.$target = $target;
    this.#homePage = new HomePage(this.$target);
    this.$target.addEventListener('purchaseLotto', (e) =>
      this.handlePurchaseLotto(e.detail)
    );
  }

  handlePurchaseLotto(purchasePrice) {
    console.log(purchasePrice);
  }
}

export default LottoGame;
