import LottoGame from "./domain/LottoGame";
import LottoGameView from "./view/step2/LottoGameView";

class App {
  /**
   * @type {HTMLDivElement}
   */
  #$root;
  #lottoGame;
  #state;

  constructor($root) {
    this.#$root = $root;
    this.#lottoGame = new LottoGame();
    this.#state = {
      lottoes: null,
    };
  }

  render() {
    const lottoGameView = new LottoGameView({
      props: { lottoes: this.#state.lottoes },
      onPurchaseAmountButtonClick: this.#onPurchaseAmountButtonClick.bind(this),
    });
    this.#$root.replaceChildren(lottoGameView.render());
  }

  #setState(nextState) {
    this.#state = nextState;
    this.render();
  }

  #onPurchaseAmountButtonClick(purchaseAmount) {
    this.#purchaseLottoes(Number(purchaseAmount));
  }

  #purchaseLottoes(purchaseAmount) {
    try {
      const lottoes = this.#lottoGame.issueLottoes(purchaseAmount);
      this.#setState({ ...this.#state, lottoes });
    } catch (error) {
      alert(error.message);
    }
  }
}

export default App;
