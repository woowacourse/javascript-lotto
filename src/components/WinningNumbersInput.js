import customCreateElement from "../utils/customElement.js";
import { LOTTO_NUMBER } from "../constants/lotto.js";

export default class WinningNumbersInput {
  constructor($target, winningNumbers) {
    this.render($target, winningNumbers);
  }

  render($target, winningNumbers) {
    const $container = customCreateElement({
      tagName: "div",
      className: "lotto-number-input-wrap",
    });
    const $text = customCreateElement({ tagName: "span", text: "당첨 번호" });
    const $inputWrap = customCreateElement({
      tagName: "div",
      className: "lotto-numbers-wrap",
    });
    const $inputs = this.createInput(winningNumbers);

    $container.appendChild($text);
    $inputs.forEach(($input) => $inputWrap.appendChild($input));

    $container.appendChild($inputWrap);
    $target.appendChild($container);
  }

  createInput(winningNumbers) {
    return Array.from({ length: LOTTO_NUMBER.LENGTH }, (_, index) => {
      const input = customCreateElement({
        tagName: "input",
        className: "number-input",
      });
      input.value = winningNumbers[index] ?? "";

      return input;
    });
  }
}
