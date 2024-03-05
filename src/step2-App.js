import LottoGame from "./domain/LottoGame";
import LottoGameView from "./view/step2/LottoGameView";

class App {
  #$root;

  #lottoGame;
  #lottoGameView;

  #lottos;

  constructor($root) {
    this.#$root = $root;
    this.#lottoGame = new LottoGame();
    this.#lottoGameView = new LottoGameView();
  }

  play() {
    this.#lottoGameView.init(this.#$root);
    this.#lottoGameView.renderPurchaseAmount({
      onPurchaseAmountButtonClick: this.#onPurchaseAmountButtonClick.bind(this),
    });
  }

  #onPurchaseAmountButtonClick(purchaseAmount) {
    const lottos = this.#purchaseLottos(purchaseAmount);
    if (!lottos) {
      return;
    }
    this.#lottos = lottos;

    this.#lottoGameView.renderPurchasedLottos({ lottos: this.#lottos });
    this.#lottoGameView.renderWinningLotto();
    this.#lottoGameView.renderDrawButton({
      onDrawButtonClick: this.#onDrawButtonClick.bind(this),
    });
  }

  #onDrawButtonClick(winningNumbers, bonusNumber) {
    const winningLotto = this.#generateWinningLotto(
      winningNumbers,
      bonusNumber,
    );
    if (!winningLotto) {
      return;
    }

    const { rankings, totalProfitRate } = this.#drawLotto(
      this.#lottos,
      winningLotto,
    );

    this.#lottoGameView.renderResultModal({
      rankings,
      totalProfitRate,
      onRetryButtonClick: this.#onRetryButtonClick.bind(this),
    });
  }

  #onRetryButtonClick() {
    this.play();
  }

  #purchaseLottos(purchaseAmount) {
    try {
      return this.#lottoGame.issueLottos(Number(purchaseAmount));
    } catch (error) {
      alert(error.message);
    }
  }

  #generateWinningLotto(winningNumbers, bonusNumber) {
    try {
      return this.#lottoGame.generateWinningLotto(
        winningNumbers.map((number) => Number(number)),
        Number(bonusNumber),
      );
    } catch (error) {
      alert(error.message);
    }
  }

  #drawLotto(lottos, winningLotto) {
    return this.#lottoGame.drawLotto(lottos, winningLotto);
  }
}

export default App;
