import LottoGame from "../models/LottoGame.js";
import calcProfitRate from "../domain/calcProfitRate.js";
import formatResults from "../domain/formatResults.js";
import {
  getBonusNumber,
  getLottoPrice,
  getWinningNumbers,
} from "../uiView/input.js";
import {
  printLottoCount,
  printLottoNumbers,
  printProfitRate,
  printResult,
} from "../uiView/output.js";

class lottoControllerUI {
  lottos;
  constructor() {
    this.lottoGame = new LottoGame();
  }

  handlePurchaseClick = (e) => {
    const price = getLottoPrice();
    if (price) {
      e.target.disabled = true;
      this.lottos = this.lottoGame.generateLottos(price);

      printLottoCount(this.lottos.length);

      const lottoListEl = document.createElement("ul");
      lottoListEl.classList.add("lotto-list");
      document.querySelector(".purchase-history .count").after(lottoListEl);

      this.lottos.forEach((lotto) => printLottoNumbers(lotto.numbers));

      document.querySelector(".winning-lotto").classList.add("active");
    }
  };

  handleInputChange = (inputs) => {
    const allFilled = Array.from(inputs).every(
      (input) => input.value.trim() !== ""
    );
    document.querySelector(".winning-lotto .result").disabled = !allFilled;
  };

  handleResultClick = () => {
    document.querySelector(".overlay").classList.add("active");

    if (document.querySelector(".result__row")) return;

    const winningNumbers = getWinningNumbers();
    const bonusNumber = getBonusNumber(winningNumbers);

    const gameResults = this.lottoGame.playLotto(this.lottos, {
      winningNumbers,
      bonusNumber,
    });

    const totalReward = this.lottoGame.calcTotalReward(gameResults);
    const rankCount = this.lottoGame.getRankCount(gameResults);

    printResult(formatResults(rankCount).reverse());
    printProfitRate(calcProfitRate(getLottoPrice(), totalReward));
  };

  handleRetryClick = () => {
    // active 제거
    document.querySelector(".overlay").classList.remove("active");
    document.querySelector(".winning-lotto").classList.remove("active");

    // 결과들 제거
    document.querySelector(".purchase-history").replaceChildren();
    [...document.querySelectorAll(".result__row")].map((resultRow) => {
      resultRow.remove();
    });
    document.querySelector(".profit").remove();

    // input value 초기화
    document.querySelector(".purchase input").value = "";
    [...document.querySelectorAll(".winning-number")].map(
      (winningNumberInput) => {
        winningNumberInput.value = "";
      }
    );
    document.querySelector(".bonus-number").value = "";

    // 구입 버튼 활성화
    document.querySelector(".purchase button").disabled = false;
  };

  handleCloseClick = () => {
    document.querySelector(".overlay").classList.remove("active");
  };
}

export default lottoControllerUI;
