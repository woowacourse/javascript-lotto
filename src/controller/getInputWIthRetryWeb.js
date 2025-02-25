import Input from "../view/InputWithWeb.js";
import validatePrice from "../validation/validatePrice.js";
import { INPUT } from "../constants/message.js";
import validateLotto from "../validation/validateLotto.js";

export const getPrice = () => {
  const inputElement = document.querySelector(".priceInput");
  const input = inputElement.value;
  return Input.retry(() => {
    validatePrice(Number(input));
    return Number(input);
  });
};

export const getLottoNumbers = () => {
  const inputs = document.querySelectorAll(".lottoNumberInput");
  console.log(inputs);
  const lottoNumbers = Array.from(inputs).map((input) => input.value);
  return Input.retry(() => {
    validateLotto(lottoNumbers);
    return lottoNumbers;
  });
};
