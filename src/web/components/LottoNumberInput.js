import { LOTTO_NUMBERS } from "../../common/lottoConstants/systemConstants.js";

const setInputCss = (style) => {
  if (style === "large") {
    return "large-input";
  }
  if (style === "small") {
    return "small-input";
  }
};

export const LottoNumberInput = ({ name, style = "small", placeholder = "" }) => {
  const lottoNumberInput = document.createElement("input");
  lottoNumberInput.classList.add(setInputCss(style));
  lottoNumberInput.min = LOTTO_NUMBERS.MIN;
  lottoNumberInput.max = LOTTO_NUMBERS.MAX;
  lottoNumberInput.step = "1";
  lottoNumberInput.type = "number";
  lottoNumberInput.pattern = "^[0-9]+$";
  lottoNumberInput.name = name;
  lottoNumberInput.placeholder = placeholder;

  return lottoNumberInput;
};
