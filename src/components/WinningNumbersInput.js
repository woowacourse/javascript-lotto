import customCreateElement from "../utils/customElement.js";
import { LOTTO_NUMBER } from "../constants/lotto.js";

export default class WinningNumbersInput {
  constructor($target, winningNumbers) {
    this.render($target, winningNumbers);
  }

  render($target, winningNumbers) {
    const $fieldset = customCreateElement({
      tagName: "div",
      className: "lotto-number-input-wrap",
    });

    const $text = customCreateElement({ tagName: "legend", text: "당첨 번호" });
    const $inputWrap = customCreateElement({
      tagName: "div",
      className: "lotto-numbers-wrap",
    });
    const $inputs = this.createInput(winningNumbers);

    $fieldset.appendChild($text);
    $inputs.forEach(($input) => $inputWrap.appendChild($input));

    $fieldset.appendChild($inputWrap);

    $target.appendChild($fieldset);
  }

  createInput(winningNumbers) {
    return Array.from({ length: LOTTO_NUMBER.LENGTH }, (_, index) => {
      const $input = customCreateElement({
        tagName: "input",
        className: "number-input",
      });
      $input.value = winningNumbers[index] ?? "";
      $input.id = `lotto${index}`;
      $input.name = "lotto[]";
      $input.type = "number";

      return $input;
    });
  }
}
