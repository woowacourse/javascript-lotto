export default class {
  #setLottoTransaction;

  constructor($target, setLottoTransaction) {
    this.render($target);
    this.#setLottoTransaction = setLottoTransaction;
  }

  render($target) {
    const $form = document.createElement("form");
    const $input = document.createElement("input");
    const $span = document.createElement("span");
    const $div = document.createElement("div");
    const $button = document.createElement("button");

    $div.className = "purchase-form-input-wrap";

    $span.innerText = "구입할 금액을 입력해주세요.";
    $span.className = "purchase-form-info-text";

    $input.placeholder = "금액";
    $input.className = "purchase-form-input";

    $button.innerText = "구입";
    $button.className = "purchase-form-button";
    $button.type = "button";

    $form.appendChild($span);
    $div.appendChild($input);
    $div.appendChild($button);

    $form.appendChild($div);

    $button.addEventListener("click", () => {
      this.#setLottoTransaction({ price: $input.value });
      const $lottoResult = document.querySelectorAll(".hidden");

      $lottoResult.forEach(($el) => {
        $el.classList.add("show");
      });
    });

    $target.appendChild($form);
  }
}
