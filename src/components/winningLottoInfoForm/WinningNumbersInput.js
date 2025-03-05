import customCreateElement from "../../utils/customElement.js";
import { LOTTO_NUMBER } from "../../constants/lotto.js";

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
      $input.min = LOTTO_NUMBER.MIN;
      $input.max = LOTTO_NUMBER.MAX;

      $input.addEventListener("change", (e) => {
        const $lottoNumbers = document.querySelectorAll(
          ".lotto-numbers-wrap > .number-input"
        );
        const winningNumbers = [];
        $lottoNumbers.forEach(($lottoNumber) => {
          winningNumbers.push($lottoNumber.value);
        });

        const $bonusNumberInput = document.querySelector(
          ".bonus-input-wrap > .number-input"
        );
        const $button = document.querySelector('.full-button[type="submit"]');

        if (
          winningNumbers.includes($bonusNumberInput.value) ||
          winningNumbers.length !== new Set(winningNumbers).size
        ) {
          $button.setAttribute("disabled", true);
          $button.classList.add("disabled-btn");
        } else {
          $button.removeAttribute("disabled");
          $button.classList.remove("disabled-btn");
        }
      });

      return $input;
    });
  }
}
