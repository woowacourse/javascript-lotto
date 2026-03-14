import {
  BonusNumberInput,
  WinningNumberInput,
} from "../../components/LottoWinningForm";

export const renderWinningNumInput = () => {
  const winningSection = document.querySelector("#winning-section");
  const winningNumbersContainer = document.querySelector(
    "#winning-numbers-container",
  );
  const bonusNumberContainer = document.querySelector(
    "#bonus-number-container",
  );

  winningNumbersContainer.innerHTML = WinningNumberInput();
  bonusNumberContainer.innerHTML = BonusNumberInput();

  winningSection.classList.remove("hidden");
};
