import "./style.css";
import PurchasedLottoes from "../components/PurchasedLottoes";
import PurchaseAmount from "../components/PurchaseAmount";
import WinningLotto from "../components/WinningLotto";
import DrawButton from "../components/DrawButton";
import ResultModal from "../components/ResultModal";

class LottoGameView {
  #state = {
    winningNumbers: Array.from({ length: 6 }).fill(""),
    bonusNumber: "",
  };

  #setBonusNumber(bonusNumber) {
    this.#setState({ ...this.#state, bonusNumber });
  }

  #setState(nextState) {
    this.#state = nextState;
  }

  init($root) {
    const $header = document.createElement("header");
    const $main = document.createElement("main");
    const $footer = document.createElement("footer");

    $header.innerHTML = `<h1>🎱 행운의 로또</h1>`;

    $main.append(
      (() => {
        const $container = document.createElement("article");
        $container.id = "container";
        $container.innerHTML = `<h1 class="lotto-game__title">🎱 내 번호 당첨 확인 🎱</h1>`;
        return $container;
      })(),
    );

    $footer.innerHTML = `<p>Copyright 2023. woowacourse</p>`;

    $root.replaceChildren($header, $main, $footer);
  }

  renderPurchaseAmount({ onPurchaseAmountButtonClick }) {
    new PurchaseAmount(document.querySelector("#container"), {
      onPurchaseAmountButtonClick,
    }).render();
  }

  renderPurchasedLottoes({ lottoes }) {
    new PurchasedLottoes(document.querySelector("#container"), {
      lottoes,
    }).render();
  }

  renderWinningLotto() {
    new WinningLotto(document.querySelector("#container"), {
      winningNumbers: this.#state.winningNumbers,
      bonusNumber: this.#state.bonusNumber,
      setBonusNumber: this.#setBonusNumber.bind(this),
    }).render();
  }

  renderDrawButton({ onDrawButtonClick }) {
    new DrawButton(document.querySelector("#container"), {
      onDrawButtonClick: () => {
        onDrawButtonClick(this.#state.winningNumbers, this.#state.bonusNumber);
      },
    }).render();
  }

  renderResultModal({ rankings, totalProfitRate, onRetryButtonClick }) {
    new ResultModal(document.querySelector("#container"), {
      rankings,
      totalProfitRate,
      onRetryButtonClick,
    }).render();
  }
}

export default LottoGameView;
