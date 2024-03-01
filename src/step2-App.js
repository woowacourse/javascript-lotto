import LottoGame from "./domain/LottoGame";
import LottoGameView from "./view/step2/LottoGameView";

class App {
  #$root;

  #lottoGame;
  #lottoGameView;

  #lottoes;

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
    const lottoes = this.#purchaseLottoes(purchaseAmount);
    if (!lottoes) {
      return;
    }
    this.#lottoes = lottoes;

    this.#lottoGameView.renderPurchasedLottoes({ lottoes: this.#lottoes });
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
      this.#lottoes,
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

  #purchaseLottoes(purchaseAmount) {
    try {
      return this.#lottoGame.issueLottoes(Number(purchaseAmount));
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

  #drawLotto(lottoes, winningLotto) {
    return this.#lottoGame.drawLotto(lottoes, winningLotto);
  }
}

export default App;
