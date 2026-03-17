class PurchaseInputView {
  #handler;
  #section;

  constructor(handlePurchaseButton) {
    this.#handler = handlePurchaseButton;
  }

  render() {
    this.#section = document.querySelector("#purchase");

    this.#section.innerHTML = `
      <form class="purchase__form">
        <label class="purchase__title" for="purchaseMoney">
          구입할 금액을 입력해주세요
        </label>

        <div class="purchase__input-group">
          <input
            class="purchase__input"
            type="text"
            inputmode="numeric"
            id="purchaseMoney"
            name="purchaseMoneyInput"
            placeholder="금액"
          />

          <button class="purchase__button" type="submit">
            구입
          </button>
        </div>
      </form>
    `;

    this.#addEventListener();
  }

  #addEventListener() {
    const form = this.#section.querySelector(".purchase__form");
    const input = this.#section.querySelector(".purchase__input");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.#handler(input.value);
    });
  }
}

export default PurchaseInputView;
