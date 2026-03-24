import { validateNotEmptyString, validateStringIsNumber } from "../Validator";

const MoneyForm = {
  getMoney() {
    const input = document.getElementById("money-input").value;
    validateNotEmptyString(input);
    validateStringIsNumber(input);

    return Number(input);
  },

  bindSubmit(handler) {
    document
      .getElementById("money-form")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        handler();
      });
  },

  reset() {
    document.getElementById("money-input").value = "";
  },
};

export default MoneyForm;
