import LottoMachine from "../domain/LottoMachine.js";
import Validator from "../domain/Validator.js";
import Output from "../view/Output.js";
import { throwError } from "../util/util.js";
import Winnings from "../domain/Winnings.js";
import { inputHandler } from "../util/InputHandler.js";

export default class Main {
  async play() {
    const purchasePrice = await this.inputPurchasePrice();
    const lottos = LottoMachine.createLottos(purchasePrice);
    this.printLottos(lottos);

    const winningNumbers = await this.inputWinningNumbers();
    const bonusNumber = await this.inputBonus(winningNumbers);
    this.printStatistics({
      winningNumbers,
      bonusNumber,
      lottos,
      purchasePrice,
    });

    this.inputRestart();
  }

  async inputPurchasePrice() {
    const purchasePrice = await inputHandler({
      inputMethod: "purchasePrice",
      parser: "toNumber",
      errorName: "PURCHASE_PRICE",
      validatorMethod: "purchasePrice",
    });
    Output.newLine();
    return purchasePrice;
  }

  async inputWinningNumbers() {
    const winningNumbers = await inputHandler({
      inputMethod: "winningNumbers",
      parser: "toSplitNumberArray",
      validatorMethod: "winningNumbers",
      errorName: "WINNING_NUMBERS",
    });
    Output.newLine();
    return winningNumbers;
  }

  async inputBonus(winningNumbers) {
    try {
      const bonusNumber = await inputHandler({
        inputMethod: "bonusNumber",
        parser: "toNumber",
        errorName: "BONUS_NUMBER",
        validatorMethod: "bonusNumber",
      });
      const error = Validator.winningsAndBonus(winningNumbers, bonusNumber);
      Output.printErrorResults(error, "WINNINGS_AND_BONUS");
      throwError(error);
      Output.newLine();
      return bonusNumber;
    } catch {
      return this.inputBonus(winningNumbers);
    }
  }

  async inputRestart() {
    const restart = await inputHandler({
      inputMethod: "restart",
      errorName: "RESTART",
      validatorMethod: "restart",
    });

    if (restart.toLowerCase() === "y") {
      return this.play();
    }
  }

  printStatistics({ winningNumbers, bonusNumber, lottos, purchasePrice }) {
    Output.winningStatistics();
    const winnings = new Winnings(winningNumbers, bonusNumber);
    const countStatistics = winnings.countStatistics(
      lottos.map((lotto) => lotto.numbers)
    );
    Object.entries(countStatistics).forEach(([rank, amount]) =>
      Output.matchResult(rank, amount)
    );

    Output.winningRate(
      winnings.calculateWinningRate(countStatistics, purchasePrice)
    );
    Output.newLine();
  }

  printLottos(lottos) {
    Output.lottoAmount(lottos.length);
    lottos.forEach((lotto) => {
      Output.lottoNumbers(lotto.numbers);
    });
    Output.newLine();
  }
}
