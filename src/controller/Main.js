import LottoMachine from "../domain/LottoMachine.js";
import Output from "../view/Output.js";
import Winnings from "../domain/Winnings.js";
import Input from "../view/Input.js";

export default class Main {
  async play() {
    const purchasePrice = await Input.purchasePrice();
    const lottos = LottoMachine.createLottos(purchasePrice);
    Output.printLottos(lottos);

    const winningNumbers = await Input.winningNumbers();
    const bonusNumber = await Input.bonusNumber(winningNumbers);
    this.resultStatistics({
      winningNumbers,
      bonusNumber,
      lottos,
      purchasePrice,
    });
    const isRestart = await Input.restartLotto();
    if (isRestart) await this.play();
  }

  resultStatistics({ winningNumbers, bonusNumber, lottos, purchasePrice }) {
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
}
