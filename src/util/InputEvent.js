import ERROR from "../constant/Error.js";
import Validator, { ValidationUtils } from "../domain/Validator.js";
import WebOutput from "../view/WebOutput.js";
import { inputFormHandler } from "./inputFormHandler.js";
import Parser from "./Parser.js";
import { throwError } from "./util.js";

function getHTML(e) {
  return document.getElementById(e);
}
class InputEvent {
  constructor(elem) {
    this.winningNumbers = new Set();
    elem.addEventListener("input", this.onInput.bind(this));
  }

  validateIsNumber(element) {
    const isNotNumber = !ValidationUtils.isNumberConvertible(element.value);
    WebOutput.printErrorResults(
      { IS_NOT_NUMBER: isNotNumber },
      ERROR.PURCHASE_PRICE,
    );

    if (isNotNumber) {
      throwError({ IS_NOT_NUMBER: isNotNumber });
      return;
    }
  }

  handlePriceInput(element) {
    this.validateIsNumber(element);

    this.validatePriceInput(element);
  }

  validatePriceInput(element) {
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
    const winningInputs = document.querySelectorAll("#winningForm input");

    const currentWinningNumbers = Array.from(
      document.querySelectorAll(".winning-bonus-box input"),
    )
      .map((input) => input.value)
      .filter(Boolean);
    console.log("currentWinningNumbers => ", currentWinningNumbers);

    this.handleWinningNumbers(element, winningInputs, currentWinningNumbers);
  }

  handleWinningNumbers(element, winningInputs, currentWinningNumbers) {
    element.value = this.filterValidNumbers(element.value);

    if (element.value.includes(",")) {
      this.fillNextInputs(element, winningInputs);
    }

    this.validateWinningInput(currentWinningNumbers);
  }

  filterValidNumbers(value) {
    const sanitizedValue = value.replace(/[^0-9,]/g, "");
    return sanitizedValue.length > 2 && !sanitizedValue.includes(",")
      ? sanitizedValue.slice(0, 2)
      : sanitizedValue;
  }

  fillNextInputs(element, winningInputs) {
    const values = element.value.split(",").filter(Boolean);
    element.value = values[0] || "";

    let nextIndex = [...winningInputs].indexOf(element) + 1;
    values.slice(1).forEach((val) => {
      if (winningInputs[nextIndex]) {
        winningInputs[nextIndex].value = val;
        nextIndex++;
      }
    });

    if (winningInputs[nextIndex]) {
      winningInputs[nextIndex].focus();
    }
  }

  validateWinningInput(currentWinningNumbers) {
    try {
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
