import { LOTTO_SIZE } from "../constants";

class WinningNumbersView {
  constructor(submitWinningNumbers) {
    document.querySelector(".winning-container").style.display = "flex";
    this.lottoContainer = document.getElementsByClassName("lotto-container");
    this.resultButton = document.getElementsByClassName("result-btn");
    this.bonusNumber = document.getElementsByClassName("bonus-input");
    this.lotteryContainer = document.querySelector(".lottery-container");
    document
      .getElementsByClassName("winning-number-form")[0]
      .addEventListener("submit", submitWinningNumbers);
  }

  makeLottoInput() {
    Array.from({ length: LOTTO_SIZE }, () => {
      this.lotteryContainer.innerHTML += `<input type="number" name="lotto-number" class="lotto-input" min="1" max="45" required>`;
    });
  }
}

export default WinningNumbersView;
