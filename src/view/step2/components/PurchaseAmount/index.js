import "./style.css";

class PurchaseAmount {
  #$parent;
  #props;
  #state;

  constructor($parent, props) {
    this.#$parent = $parent;
    this.#props = props;
    this.#state = {
      purchaseAmount: "",
    };
  }

  render() {
    const $oldPurchaseAmount = this.#$parent.querySelector("#purchase-amount");
    const $newPurchaseAmount = this.#generatePurchaseAmount();

    if ($oldPurchaseAmount) {
      this.#$parent.replaceChild($newPurchaseAmount, $oldPurchaseAmount);
      return;
    }

    this.#$parent.append($newPurchaseAmount);
  }

  #generatePurchaseAmount() {
    const $purchaseAmount = document.createElement("div");
    $purchaseAmount.id = "purchase-amount";
    $purchaseAmount.className = "purchase-amount";

    const $title = document.createElement("h3");
    $title.className = "purchase-amount__title";
    $title.innerText = "구입할 금액을 입력해주세요.";

    const $content = document.createElement("div");
    $content.className = "purchase-amount__content";
    $content.append(
      this.#generateContentInput(),
      this.#generateContentButton(),
    );

    $purchaseAmount.append($title, $content);

    return $purchaseAmount;
  }

  #generateContentInput() {
    const $contentInput = document.createElement("input");
    $contentInput.type = "text";
    $contentInput.className = "input purchase-amount__content__input";
    $contentInput.placeholder = "금액";
    $contentInput.addEventListener("input", (e) => {
      this.#state.purchaseAmount = e.target.value;
    });
    $contentInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        this.#props.onPurchaseAmountButtonClick(this.#state.purchaseAmount);
      }
    });

    return $contentInput;
  }

  #generateContentButton() {
    const $contentButton = document.createElement("button");
    $contentButton.className =
      "button--primary purchase-amount__content__button";
    $contentButton.innerText = "구입";
    $contentButton.addEventListener("click", () =>
      this.#props.onPurchaseAmountButtonClick(this.#state.purchaseAmount),
    );

    return $contentButton;
  }
}

export default PurchaseAmount;
