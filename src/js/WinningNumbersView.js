class WinningNumbersView {
  constructor(submitWinningNumbers) {
    this.lottoContainer = document.getElementsByClassName("lotto-container");
    this.resultButton = document.getElementsByClassName("result-btn");
    this.lottoNumbers = document.getElementsByClassName("lotto-input");
    document
      .getElementsByClassName("winning-number-form")[0]
      .addEventListener("submit", submitWinningNumbers);
  }
}

export default WinningNumbersView;
