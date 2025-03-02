import ERROR from "../constant/Error";
import Validator from "../domain/Validator";
import WebOutput from "../view/WebOutput";
import { inputFormHandler } from "./inputFormHandler";
import Parser from "./Parser";

function getHTML(e) {
  return document.getElementById(e);
}
class InputEvent {
  constructor(elem) {
    elem.addEventListener("input", this.onInput.bind(this));
  }

  handlePriceInput(element) {
    getHTML("priceErrorInfo").innerHTML = "";
    try {
      inputFormHandler({
        inputValue: element.value,
        parser: Parser.toNumber,
        validatorMethod: Validator.purchasePrice,
        errorName: ERROR.PURCHASE_PRICE,
      });
      getHTML("btnBuy").removeAttribute("disabled");
    } catch {
      getHTML("btnBuy").setAttribute("disabled", true);
    }
  }

  handleWinningInput(element) {
    let inputValue = element.value.replace(/[^0-9,]/g, "");
    const winningInputs = document.querySelectorAll("#winningForm input");
    const isBonusFocus = winningInputs[6] === document.activeElement;

    if (isBonusFocus) {
      getHTML(ERROR.WEB_WINNINGS_AND_BONUS.ELEMENT_ID).innerHTML = "";
      getHTML(ERROR.BONUS_NUMBER.ELEMENT_ID).innerHTML = "";
      const currentWinningNumbers = Array.from(
        document.querySelectorAll(".winning-number"),
      )
        .map((input) => input.value)
        .filter(Boolean);
      if (currentWinningNumbers.length !== 0) {
        const errorResults = Validator.winningsAndBonus(
          currentWinningNumbers,
          element.value,
        );
        WebOutput.printErrorResults(errorResults, ERROR.WEB_WINNINGS_AND_BONUS);
      }
      try {
        inputFormHandler({
          inputValue: element.value,
          parser: Parser.toNumber,
          validatorMethod: Validator.bonusNumber,
          errorName: ERROR.BONUS_NUMBER,
        });
      } catch {
        return;
      }
    }

    if (!isBonusFocus) {
      getHTML(ERROR.WINNING_NUMBERS.ELEMENT_ID).innerHTML = "";
      if (inputValue.length > 2 && !inputValue.includes(",")) {
        inputValue = inputValue.slice(0, 2);
      }
      if (inputValue.includes(",")) {
        const values = inputValue.split(",").filter(Boolean);
        element.value = values[0] || "";

        let nextIndex = Array.from(winningInputs).indexOf(element) + 1;
        for (let i = 1; i < values.length; i++) {
          if (winningInputs[nextIndex]) {
            winningInputs[nextIndex].value = values[i];
            nextIndex++;
          }
        }

        if (winningInputs[nextIndex]) {
          winningInputs[nextIndex].focus();
        }
      } else {
        element.value = inputValue;
      }
      try {
        const currentWinningNumbers = Array.from(
          document.querySelectorAll(".winning-number"),
        )
          .map((input) => input.value)
          .filter(Boolean);
        inputFormHandler({
          inputValue: currentWinningNumbers,
          parser: Parser.toNumberArray,
          validatorMethod: Validator.webWinningNumbers,
          errorName: ERROR.WEB_WINNING_NUMBERS,
        });
      } catch {
        return;
      }
    }
  }

  onInput(event) {
    let target = event.target.closest("[data-input]");

    if (!target) return;

    let action = target.dataset.input;

    if (action && typeof this[action] === "function") {
      this[action](target);
    }
  }
}

new InputEvent(document);
