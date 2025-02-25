import { LOTTO_NUMBERS } from "../lottoConstants/systemConstants.js";

export const LottoNumberInput = (name) => {
  const lottoNumberInput = document.createElement("input");

  lottoNumberInput.classList.add("lotto-number-input");
  lottoNumberInput.min = LOTTO_NUMBERS.MIN;
  lottoNumberInput.max = LOTTO_NUMBERS.MAX;
  lottoNumberInput.step = "1";
  lottoNumberInput.type = "number";
  lottoNumberInput.pattern = "^[0-9]+$";
  lottoNumberInput.name = name;

  return lottoNumberInput;
};
