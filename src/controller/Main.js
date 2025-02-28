import LottoMachine from "../domain/LottoMachine.js";
import Output from "../view/Output.js";
import Winnings from "../domain/Winnings.js";
import Input from "../view/Input.js";
import Lotto from "../domain/Lotto.js";

export default class Main {
  async play() {
    const lottoMachine = new LottoMachine(Lotto);
    const purchasePrice = await Input.purchasePrice();
    const publishedLottos = lottoMachine.publishLottos(purchasePrice);
    Output.printLottos(publishedLottos);
    await this.defineWinningRules(lottoMachine);
    await this.printLottoResult(lottoMachine, purchasePrice);
    const isRestart = await Input.restartLotto();
    if (isRestart) await this.play();
  }

  async defineWinningRules(lottoMachine) {
    const winningNumbers = await Input.winningNumbers();
    const bonusNumber = await Input.bonusNumber(winningNumbers);
    const winnings = new Winnings(winningNumbers, bonusNumber);
    lottoMachine.defineRule(winnings);
    return winnings;
  }

  async printLottoResult(lottoMachine, purchasePrice) {
    const { countStatistics, winningRate } =
      lottoMachine.drawWinning(purchasePrice);

    Object.entries(countStatistics).forEach(([rank, amount]) =>
      Output.matchResult(rank, amount),
    );
    Output.winningRate(winningRate);
    Output.newLine();
  }
}
