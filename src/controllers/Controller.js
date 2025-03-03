import Input from "../views/Input.js";
import Output from "../views/Output.js";
import issueLottos from "../domains/issueLottos.js";
import LottoGame from "../domains/lottoGame.js";
import validatePurchaseAmount from "../validations/validatePurchaseAmount.js";

class Controller {
  constructor() {
    this.lottoGame = new LottoGame();
    this.purchaseAmount = null;
    this.lottos = [];
  }

  async start(winningNumbers = null, bonusNumber = null) {
    if (this.purchaseAmount === null) {
      const isValid = await this.#purchaseLottos();
      if (!isValid) {
        return null;
      }
    }

    if (!winningNumbers || bonusNumber === null) {
      Output.printError("당첨 번호를 입력해야 합니다.");
      return null;
    }

    return this.#processResults(winningNumbers, bonusNumber);
  }

  async #purchaseLottos() {
    const purchaseInput = await Input.readPurchaseAmount();
    let purchaseAmount;

    try {
      purchaseAmount = validatePurchaseAmount(purchaseInput);
    } catch (error) {
      Output.printError(error.message);
      document.querySelector("#purchase-amount").value = "";
      return false;
    }

    const lottoCount = Math.floor(purchaseAmount / 1000);
    if (lottoCount < 1) {
      Output.printError("구매 금액이 부족합니다.");
      document.querySelector("#purchase-amount").value = "";
      return false;
    }

    this.purchaseAmount = purchaseAmount;
    this.lottos = issueLottos(purchaseAmount);
    Output.printIssuedLottos(this.lottos);

    return true;
  }

  #processResults(winningNumbers, bonusNumber) {
    const winningStatistics = this.lottoGame.calculateResults(
      this.lottos,
      winningNumbers,
      bonusNumber
    );

    if (!winningStatistics || !winningStatistics.statistics) {
      console.error(
        "❌ winningStatistics가 제대로 생성되지 않음!",
        winningStatistics
      );
      return null;
    }

    Output.printStatistics(winningStatistics.statistics);
    Output.printProfitRatio(
      winningStatistics.calculateProfitRatio(this.purchaseAmount)
    );

    Output.displayWinningStatistics(winningStatistics);

    return winningStatistics;
  }
}

export default Controller;
