import { LOTTO_SIZE } from "../../constants";

class WinningNumbersView {
  constructor(submitWinningNumbers) {
    this.winningContainer = document.querySelector(".winning-container");
    this.winningContainer.style.display = "flex";
    this.lottoContainer = document.querySelector(".lotto-container");
    this.resultButton = document.querySelector(".result-btn");
    this.bonusNumber = document.querySelector(".bonus-input");
    this.lotteryContainer = document.querySelector(".lottery-container");
    document
      .querySelector(".winning-number-form")
      .addEventListener("submit", submitWinningNumbers);
  }

  makeLottoInput() {
    this.lotteryContainer.insertAdjacentHTML(
      "beforeend",
      Array.from({ length: LOTTO_SIZE })
        .map(
          () =>
            `<input type="number" name="lotto-number" class="lotto-input" min="1" max="45" required/>`
        )
        .join("")
    );
  }

  hideWinningContainer() {
    this.winningContainer.style.display = "none";
    this.lotteryContainer.innerHTML = "";
  }
}

export default WinningNumbersView;
