class PurchaseAmount {
  state;
  onPurchaseAmountButtonClick;

  constructor({ onPurchaseAmountButtonClick }) {
    this.state = {
      purchaseAmount: "",
    };
    this.onPurchaseAmountButtonClick = onPurchaseAmountButtonClick;
  }

  onPurchaseAmountInput(e) {
    this.setState({ ...this.state, purchaseAmount: e.target.value });
  }

  setState(nextState) {
    this.state = nextState;
  }

  render() {
    const $root = document.createElement("div");
    $root.className = "purchase-amount";

    const $title = document.createElement("h3");
    $title.className = "purchase-amount__title";

    const $content = document.createElement("div");
    $content.className = "purchase-amount__content";

    const $contentInput = document.createElement("input");
    $contentInput.type = "text";
    $contentInput.className = "input purchase-amount__content__input";
    $contentInput.placeholder = "금액";
    $contentInput.value = this.state.purchaseAmount;
    $contentInput.addEventListener(
      "input",
      this.onPurchaseAmountInput.bind(this),
    );

    const $contentButton = document.createElement("button");
    $contentButton.className =
      "button--primary purchase-amount__content__button";
    $contentButton.innerText = "구입";
    $contentButton.addEventListener("click", () =>
      this.onPurchaseAmountButtonClick(this.state.purchaseAmount),
    );

    $content.append($contentInput, $contentButton);

    $root.append($title, $content);

    return $root;
  }
}

class LottoGameView {
  #purchaseAmount;

  constructor({ onPurchaseAmountButtonClick }) {
    this.#purchaseAmount = new PurchaseAmount({ onPurchaseAmountButtonClick });
  }

  render() {
    const $root = document.createElement("div");

    const $header = document.createElement("header");
    const $main = document.createElement("main");
    const $footer = document.createElement("footer");

    $header.innerHTML = `<h1>🎱 행운의 로또</h1>`;

    const $article = document.createElement("article");
    $article.innerHTML = `<h1 class="lotto-game__title">🎱 내 번호 당첨 확인 🎱</h1>`;
    $article.append(this.#purchaseAmount.render());
    $main.append($article);

    $footer.innerHTML = `<p>Copyright 2023. woowacourse</p>`;

    $root.append($header, $main, $footer);

    return $root;
  }
}

export default LottoGameView;
