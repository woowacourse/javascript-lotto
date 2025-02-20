import LottoMachine from "../domain/LottoMachine.js";
import Validator from "../domain/Validator.js";
import Output from "../view/Output.js";
import { throwError } from "../util/util.js";
import Winnings from "../domain/Winnings.js";
import { inputHandler } from "../util/InputHandler.js";
import Input from "../view/Input.js";
import { INPUT_MESSAGE } from "../constant/Message.js";

export default class Main {
  async play() {
    const purchasePrice = await Input.purchasePrice();
    const lottos = LottoMachine.createLottos(purchasePrice);
    this.printLottos(lottos);

    const winningNumbers = await Input.inputWinningNumbers();
    const bonusNumber = await Input.inputBonus(winningNumbers);
    this.printStatistics({
      winningNumbers,
      bonusNumber,
      lottos,
      purchasePrice,
    });

    this.inputRestart();
  }

  async inputRestart() {
    const restart = await inputHandler({
      promptMessage: INPUT_MESSAGE.RESTART,
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
