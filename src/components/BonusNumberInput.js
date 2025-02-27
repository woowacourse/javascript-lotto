import customCreateElement from "../utils/customElement.js";

export default class BonusNumberInput {
  constructor($target, bonusNumber) {
    this.render($target, bonusNumber);
  }

  render($target, bonusNumber) {
    const $div = customCreateElement({
      tagName: "div",
      className: "lotto-number-input-wrap bonus-input-wrap",
    });

    const $text = customCreateElement({ tagName: "span", text: "보너스 번호" });
    const $input = customCreateElement({
      tagName: "input",
      className: "number-input",
    });
    $input.value = bonusNumber === 0 ? "" : bonusNumber;

    $div.appendChild($text);
    $div.appendChild($input);
    $target.appendChild($div);
  }
}
