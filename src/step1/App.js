import { read } from './Utils.js';
import Input from './Input.js';
import { LottoMachine } from './LottoMachine.js';
import { Output } from './Output.js';

class App {
    async run() {
        while(true) {
            const amount = await Input.reRead(Input.readPurchaseAmount);
            const lottoMachine = new LottoMachine(amount)
            Output.printPurchaseLottoCount(lottoMachine.purchaseCount);
            Output.printLottos(lottoMachine.lottos);
            const winningLottoNumber = (await Input.reRead(Input.readWinningLottoNumber)).getLottoNumber();
            const winningLotto = await Input.reRead(Input.readBonusNumber, winningLottoNumber);
            lottoMachine.calculateMatchResult(
                winningLotto.getLottoNumber(), winningLotto.getBonusNumber()
            );
            Output.printResult(lottoMachine);
            const restart = await Input.reRead(Input.readRetry);
            if (restart === 'n') {
                read.close();
                break;
            }
        }
    }
}

export default App;
