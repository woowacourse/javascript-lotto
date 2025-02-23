import { LOTTO_NUMBERS } from "../lottoConstants/systemConstants.js";

export const displayWinning = () => {
  const winningContainer = document.querySelector(".winning-numbers");
  const winningInputContainer = document.querySelector(".winning-bonus-container");

  const winningPrompt = document.createElement("div");
  winningPrompt.classList.add("winning-prompt");
  winningPrompt.textContent = `지난 주 당첨번호 ${LOTTO_NUMBERS.LENGTH}개와 보너스 번호 ${LOTTO_NUMBERS.BONUS_LENGTH}개를 입력해주세요.`;

  winningContainer.appendChild(winningPrompt);
  winningInputContainer.appendChild(displayWinningInput());
  winningInputContainer.appendChild(displayBonusInput());
  winningContainer.appendChild(winningInputContainer);
};

export const displayWinningInput = () => {
  const winningInputWrap = document.querySelector(".winning-input-wrap");
  const winningInputContainer = document.createElement("div");
  winningInputContainer.classList.add("winning-input-container");

  const winningInputLabel = document.createElement("div");
  winningInputLabel.textContent = "당첨 번호";

  winningInputWrap.appendChild(winningInputLabel);

  for (let i = 0; i < LOTTO_NUMBERS.LENGTH; i++) {
    const winningInput = document.createElement("input");
    winningInput.min = LOTTO_NUMBERS.MIN;
    winningInput.max = LOTTO_NUMBERS.MAX;
    winningInput.classList.add("winning-input");
    winningInputContainer.appendChild(winningInput);
  }

  winningInputWrap.appendChild(winningInputContainer);
  return winningInputWrap;
};

export const displayBonusInput = () => {
  const bonusInputWrap = document.querySelector(".bonus-input-wrap");
  const bonusInputContainer = document.createElement("div");
  bonusInputContainer.classList.add("bonus-input-container");

  const bonusInputLabel = document.createElement("div");
  bonusInputLabel.textContent = "보너스 번호";
  bonusInputContainer.appendChild(bonusInputLabel);

  const bonusInput = document.createElement("input");
  bonusInput.min = LOTTO_NUMBERS.MIN;
  bonusInput.max = LOTTO_NUMBERS.MAX;
  bonusInput.step = "1";
  bonusInput.type = "number";
  bonusInput.classList.add("bonus-input");
  bonusInputContainer.appendChild(bonusInput);

  bonusInputWrap.appendChild(bonusInputContainer);

  return bonusInputWrap;
};
