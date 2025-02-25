import { LOTTO_NUMBERS } from "../lottoConstants/systemConstants.js";
import { LottoNumberInput } from "./LottoNumberInput.js";

export const WinningPrompt = () => {
  const winningPrompt = document.querySelector(".winning-prompt");
  winningPrompt.textContent = `지난 주 당첨번호 ${LOTTO_NUMBERS.LENGTH}개와 보너스 번호 ${LOTTO_NUMBERS.BONUS_LENGTH}개를 입력해주세요.`;
  return winningPrompt;
};

export const WinningBonusInput = () => {
  const winningInputContainer = document.querySelector(".winning-bonus-container");

  winningInputContainer.appendChild(WinningInput());
  winningInputContainer.appendChild(BonusInput());
};

const WinningInput = () => {
  const winningInputWrap = document.querySelector(".winning-input-wrap");

  const winningInputContainer = document.createElement("div");
  winningInputContainer.classList.add("winning-input-container");

  const winningInputLabel = document.createElement("div");
  winningInputLabel.textContent = "당첨 번호";
  winningInputWrap.appendChild(winningInputLabel);

  Array.from({ length: LOTTO_NUMBERS.LENGTH }, () => {
    winningInputContainer.appendChild(LottoNumberInput());
  });
  winningInputWrap.appendChild(winningInputContainer);

  return winningInputWrap;
};

const BonusInput = () => {
  const bonusInputWrap = document.querySelector(".bonus-input-wrap");

  const bonusInputLabel = document.createElement("div");
  bonusInputLabel.textContent = "보너스 번호";

  bonusInputWrap.appendChild(bonusInputLabel);
  bonusInputWrap.appendChild(LottoNumberInput());
  return bonusInputWrap;
};
