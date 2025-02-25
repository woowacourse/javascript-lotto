import Input from "../view/InputWithWeb.js";
import validatePrice from "../validation/validatePrice.js";

export const getPrice = () => {
  const inputElement = document.querySelector(".priceInput");
  return Input.retry(() => {
    const input = inputElement.value;
    validatePrice(Number(input));
    return Number(input);
  });
};
