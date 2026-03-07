import { read } from './Utils.js';
import Input from './Input.js';
import { LottoMachine } from './LottoMachine.js';
import { Output } from './Output.js';
import { reReadUntilSuccess } from './Utils.js';

class App {
  async run() {
    while (true) {
      const amount = await reReadUntilSuccess(Input.readPurchaseAmount);
      const lottoMachine = new LottoMachine(amount);
      Output.printPurchaseLottoCount(lottoMachine.purchaseCount);
      Output.printLottos(lottoMachine.lottos);
      const winningLottoNumber = (await reReadUntilSuccess(Input.readWinningLottoNumber)).getLottoNumber();
      const winningLotto = await reReadUntilSuccess(() => Input.readBonusNumber(winningLottoNumber));
      lottoMachine.calculateMatchResult(
        winningLotto.getLottoNumber(), winningLotto.getBonusNumber()
      );
      Output.printResult(lottoMachine);
      const restart = await reReadUntilSuccess(Input.readRetry);
      if (restart === 'n') {
        read.close();
        break;
      }
    }
  }
}

export default App;
