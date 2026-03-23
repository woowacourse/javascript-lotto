import { read } from './Readline.js';
import Input from './Input.js';
import { LottoMachine } from './LottoMachine.js';
import { Output } from './Output.js';
import { reReadUntilSuccess } from './Utils.js';
import { WinningLotto } from './Lotto.js';

const App = {
  async run() {
    while (true) {
      const amount = await reReadUntilSuccess(Input.readPurchaseAmount);
      const lottoMachine = new LottoMachine(amount);
      const purchaseLottos = lottoMachine.getLottos()
      Output.printPurchaseLottoCount(purchaseLottos.length);
      Output.printLottos(purchaseLottos);
      const winningLottoNumber = await reReadUntilSuccess(Input.readWinningLottoNumber);
      const bonusNumber = await reReadUntilSuccess(() => Input.readBonusNumber(winningLottoNumber));
      const winningLotto = new WinningLotto(winningLottoNumber, bonusNumber);
      lottoMachine.calculateMatchResult(
        winningLotto.getWinningNumber(), winningLotto.getBonusNumber()
      );
      Output.printResult(lottoMachine.getMatchResultSummary(), lottoMachine.getRateOfReturn());
      const restart = await reReadUntilSuccess(Input.readRetry);
      if (restart === 'n') {
        read.close();
        break;
      }
    }
  }
}

export default App;
