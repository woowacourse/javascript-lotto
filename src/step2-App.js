import LottoGame from "./domain/LottoGame";
import LottoGameView from "./view/step2/LottoGameView";

class App {
  /**
   * @type {HTMLDivElement}
   */
  #$root;
  #lottoGame;

  constructor($root) {
    this.#$root = $root;
    this.#lottoGame = new LottoGame();
  }

  init() {
    const lottoGameView = new LottoGameView({
      onPurchaseAmountButtonClick: this.#onPurchaseAmountButtonClick.bind(this),
    });
    this.#$root.append(lottoGameView.render());
  }

  #onPurchaseAmountButtonClick(purchaseAmount) {
    this.#purchaseLottos(Number(purchaseAmount));
  }

  #purchaseLottos(purchaseAmount) {
    try {
      const lottos = this.#lottoGame.issueLottos(purchaseAmount);
      console.log(lottos);
    } catch (error) {
      alert(error.message);
    }
  }
}

export default App;
