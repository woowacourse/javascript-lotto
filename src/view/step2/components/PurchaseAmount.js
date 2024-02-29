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

export default PurchaseAmount;
