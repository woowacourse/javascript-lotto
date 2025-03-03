import { PRICE } from "../constants/price.js";
import LottoFactory from "../domain/LottoFactory.js";
import { divideByUnit } from "../utils/count.js";
import validatePrice from "../validation/validatePrice.js";
import lottoTransactionStore from "../store/lottoTransactionStore.js";
import customCreateElement from "../utils/customElement.js";

export default class PurchaseForm {
  #setShow;

  constructor($target, setShow) {
    this.$target = $target;
    this.#setShow = setShow;
    this.render($target);
  }

  render() {
    const $form = document.createElement("form");
    const $label = customCreateElement({
      tagName: "label",
      className: "purchase-form-info-text",
      text: "구입할 금액을 입력해주세요.",
    });
    $label.setAttribute("for", "price");
    const $div = customCreateElement({
      tagName: "div",
      className: "purchase-form-input-wrap",
    });
    const $input = customCreateElement({
      tagName: "input",
      className: "purchase-form-input",
    });
    $input.placeholder = "금액";
    $input.id = "price";
    $input.type = "number";
    $input.min = PRICE.MIN;
    $input.max = PRICE.MAX;

    const $button = customCreateElement({
      tagName: "button",
      className: "purchase-form-button",
      text: "구입",
    });
    $button.type = "submit";

    $form.appendChild($label);
    $div.appendChild($input);
    $div.appendChild($button);

    $form.appendChild($div);

    $form.addEventListener("submit", (e) => {
      e.preventDefault();

      this.handleSubmit($input);
    });

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

    this.#setShow(true);
    lottoTransactionStore.getState().setLottoTransaction({ price, lottos });

    const inputs = document.querySelectorAll(
      ".lotto-numbers-wrap > .number-input"
    );
    inputs[0].focus();
  }
}
