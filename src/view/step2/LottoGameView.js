import PurchasedLottoes from "./components/PurchasedLottoes";
import PurchaseAmount from "./components/PurchaseAmount";
import WinningLotto from "./components/WinningLotto";
import CheckResultButton from "./components/CheckResultButton";

class LottoGameView {
  #purchaseAmount;
  #purchasedLottoes;
  #winningLotto;
  #checkResultButton;

  constructor({ props, onPurchaseAmountButtonClick }) {
    this.#purchaseAmount = new PurchaseAmount({ onPurchaseAmountButtonClick });
    this.#purchasedLottoes = new PurchasedLottoes({
      props: { lottoes: props.lottoes },
    });
    this.#winningLotto = new WinningLotto({
      props: { isPurchased: !!props.lottoes },
    });
    this.#checkResultButton = new CheckResultButton({
      props: { isPurchased: !!props.lottoes },
    });
  }

  render() {
    const $root = document.createElement("div");

    const $header = document.createElement("header");
    const $main = document.createElement("main");
    const $footer = document.createElement("footer");

    $header.innerHTML = `<h1>🎱 행운의 로또</h1>`;

    const $article = document.createElement("article");
    $article.innerHTML = `<h1 class="lotto-game__title">🎱 내 번호 당첨 확인 🎱</h1>`;
    $article.append(
      this.#purchaseAmount.render(),
      this.#purchasedLottoes.render(),
      this.#winningLotto.render(),
      this.#checkResultButton.render(),
    );
    $main.append($article);

    $footer.innerHTML = `<p>Copyright 2023. woowacourse</p>`;

    $root.append($header, $main, $footer);

    return $root;
  }
}

export default LottoGameView;
