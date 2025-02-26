import { PRICE } from "../constants/price.js";
import LottoFactory from "../domain/LottoFactory.js";
import { divideByUnit } from "../utils/count.js";
import validatePrice from "../validation/validatePrice.js";

export default class PurchaseForm {
  #setLottoTransaction;
  #setShow;

  constructor($target, setLottoTransaction, setShow) {
    this.$target = $target;
    this.#setLottoTransaction = setLottoTransaction;
    this.#setShow = setShow;
    this.render($target);
  }

  render() {
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

    $button.addEventListener("click", () => this.handleSubmit($input));

    this.$target.appendChild($form);
  }

  handleSubmit($input) {
    const price = $input.value;

    try {
      validatePrice(price);
    } catch (e) {
      alert(e.message);
      return;
    }

    const countNumber = divideByUnit(PRICE.UNIT, price);
    const lottos = LottoFactory.issueLottos(countNumber);

    this.#setLottoTransaction({ price, lottos });
    this.#setShow(true);
  }
}
