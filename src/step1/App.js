import { read } from "./Utils.js";
import Input from "./Input.js";
import { LottoMachine } from "./LottoMachine.js";
import { Output } from "./Output.js";

class App {
  async run() {
    while (true) {
      const amount = await Input.reRead(Input.readPurchaseAmount);

      const lottoMachine = new LottoMachine(amount);

      this.showPurchaseLotto(lottoMachine);

      const winningLotto = await this.getWinningLotto();

      this.showMatchResult(lottoMachine, winningLotto);

      const restart = await Input.reRead(Input.readRetry);
      if (restart === "n") {
        read.close();
        break;
      }
    }
  }

  async showPurchaseLotto(lottoMachine) {
    Output.printPurchaseLottoCount(lottoMachine.getPurchaseCount());
    Output.printLottos(lottoMachine.getLottos());
  }

  showMatchResult(lottoMachine, winningLotto) {
    lottoMachine.calculateMatchResult(
      winningLotto.getLottoNumber(),
      winningLotto.getBonusNumber(),
    );
    Output.printResult(
      lottoMachine.getMatchResult(),
      lottoMachine.getRateOfReturn(),
    );
  }

  async getWinningLotto() {
    const winningLottoNumber = (
      await Input.reRead(Input.readWinningLottoNumber)
    ).getLottoNumber();
    const winningLotto = await Input.reRead(
      Input.readBonusNumber,
      winningLottoNumber,
    );

    return winningLotto;
  }
}

export default App;
