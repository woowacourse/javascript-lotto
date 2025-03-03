import { LOTTO_NUMBERS } from "../../common/lottoConstants/systemConstants.js";
import { LottoNumberInput } from "./LottoNumberInput.js";

export const WinningInput = () => {
  const winningInputWrap = document.createElement("div");
  winningInputWrap.classList.add("winning-input-wrap");

  const winningInputContainer = document.createElement("div");
  winningInputContainer.classList.add("winning-input-container");

  const winningInputLabel = document.createElement("div");
  winningInputLabel.textContent = "당첨 번호";
  winningInputWrap.appendChild(winningInputLabel);

  Array.from({ length: LOTTO_NUMBERS.LENGTH }, () => {
    winningInputContainer.appendChild(LottoNumberInput({ name: "winning-number" }));
  });
  winningInputWrap.appendChild(winningInputContainer);

  return winningInputWrap;
};

export const BonusInput = () => {
  const bonusInputWrap = document.createElement("div");
  bonusInputWrap.classList.add("bonus-input-wrap");

  const bonusInputLabel = document.createElement("div");
  bonusInputLabel.textContent = "보너스 번호";

  bonusInputWrap.appendChild(bonusInputLabel);
  bonusInputWrap.appendChild(LottoNumberInput({ name: "bonus-number" }));
  return bonusInputWrap;
};
