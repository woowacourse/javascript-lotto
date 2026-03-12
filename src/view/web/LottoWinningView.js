import {
  BonusNumberGroup,
  WinningNumberGroup,
} from "../../components/LottoWinningForm";

export const renderWinningInput = () => {
  const winningInputWrapper = document.querySelector("#winning-input-wrapper");
  const winningNumbersContainer = document.querySelector(
    "#winning-numbers-container",
  );
  const bonusNumberContainer = document.querySelector(
    "#bonus-number-container",
  );

  winningNumbersContainer.innerHTML = WinningNumberGroup();
  bonusNumberContainer.innerHTML = BonusNumberGroup();

  winningInputWrapper.classList.remove("hidden");
};
