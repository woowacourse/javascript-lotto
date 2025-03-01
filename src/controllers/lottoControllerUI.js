import LottoGame from "../models/LottoGame.js";
import calcProfitRate from "../domain/calcProfitRate.js";
import formatResults from "../domain/formatResults.js";
import {
  getBonusNumber,
  getLottoPrice,
  getWinningNumbers,
} from "../uiView/input.js";
import {
  clearInput,
  clearResultList,
  disabledTarget,
  printLottoCount,
  printLottoNumbers,
  printProfitRate,
  printResult,
  removeActiveClass,
} from "../uiView/output.js";

class lottoControllerUI {
  lottos;

  constructor() {
    this.lottoGame = new LottoGame();
  }

  handlePurchaseClick = (e) => {
    const price = getLottoPrice();
    if (price) {
      disabledTarget(e.target, true);
      this.lottos = this.lottoGame.generateLottos(price);

      printLottoCount(this.lottos.length);

      const lottoListEl = document.createElement("ul");
      lottoListEl.classList.add("lotto-list");
      document.querySelector(".purchase-history .count").after(lottoListEl);

      this.lottos.forEach((lotto) => printLottoNumbers(lotto.numbers));

      document.querySelector(".winning-lotto").classList.add("active");
      document.querySelector(".winning-number").focus();
    }
  };

  handleInputChange = (inputs) => {
    const allFilled = Array.from(inputs).every(
      (input) => input.value.trim() !== ""
    );
    disabledTarget(
      document.querySelector(".winning-lotto .result"),
      !allFilled
    );
  };

  handleResultClick = (inputs) => {
    if (document.querySelector(".result__row")) {
      document.querySelector(".overlay").classList.add("active");
      return;
    }

    const winningNumbers = getWinningNumbers();
    if (!winningNumbers) return;

    const bonusNumber = getBonusNumber(winningNumbers);
    if (!bonusNumber) return;

    document.querySelector(".overlay").classList.add("active");

    const gameResults = this.lottoGame.playLotto(this.lottos, {
      winningNumbers,
      bonusNumber,
    });

    const totalReward = this.lottoGame.calcTotalReward(gameResults);
    const rankCount = this.lottoGame.getRankCount(gameResults);

    printResult(formatResults(rankCount).reverse());
    printProfitRate(calcProfitRate(getLottoPrice(), totalReward));

    inputs.forEach((input) => {
      disabledTarget(input, true);
    });
  };

  handleRetryClick = (inputs) => {
    removeActiveClass();
    clearResultList();
    clearInput();
    disabledTarget(document.querySelector(".purchase button"), false);
    inputs.forEach((input) => {
      disabledTarget(input, false);
    });
  };

  handleCloseClick = () => {
    document.querySelector(".overlay").classList.remove("active");
  };

  preventDefault = (e) => {
    e.preventDefault();
  };

  stopPropagation = (e) => {
    e.stopPropagation();
  };
}

export default lottoControllerUI;
