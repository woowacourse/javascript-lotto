import customCreateElement from "../../utils/customElement.js";
import { LOTTO_NUMBER } from "../../constants/lotto.js";

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
    $input.type = "number";
    $input.min = LOTTO_NUMBER.MIN;
    $input.max = LOTTO_NUMBER.MAX;
    $input.value = bonusNumber === 0 ? "" : bonusNumber;

    $input.addEventListener("change", () => {
      const $lottoNumbers = document.querySelectorAll(
        ".lotto-numbers-wrap > .number-input"
      );
      const winningNumbers = [];
      $lottoNumbers.forEach(($lottoNumber) => {
        winningNumbers.push($lottoNumber.value);
      });

      const $button = document.querySelector('.full-button[type="submit"]');
      if (winningNumbers.includes($input.value)) {
        $button.setAttribute("disabled", true);
        $button.classList.add("disabled-btn");
      } else {
        $button.removeAttribute("disabled");
        $button.classList.remove("disabled-btn");
      }
    });

    $div.appendChild($text);
    $div.appendChild($input);
    $target.appendChild($div);
  }
}
