import {
  BonusNumberInput,
  WinningNumberInput,
} from "../../components/LottoWinningForm";

export const renderWinningNumInput = () => {
  const winningInputWrapper = document.querySelector("#winning-input-wrapper");
  const winningNumbersContainer = document.querySelector(
    "#winning-numbers-container",
  );
  const bonusNumberContainer = document.querySelector(
    "#bonus-number-container",
  );

  winningNumbersContainer.innerHTML = WinningNumberInput();
  bonusNumberContainer.innerHTML = BonusNumberInput();

  winningInputWrapper.classList.remove("hidden");
};
