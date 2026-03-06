import { readLine, read } from './Utils.js';
import Validator from './Validator.js';
import { Lotto, WinningLotto } from './Lotto.js';
import { LottoMachine } from './LottoMachine.js';
import { Output } from './Output.js';

class App {
    async run() {
        while(true) {
            const amount = await this.amount();
            const lottoMachine = new LottoMachine(amount)
            Output.printPurchaseLottoCount(lottoMachine.purchaseCount);
            Output.printLottos(lottoMachine.lottos);
            const winningLottoNumber = (await this.winningLotto()).getLottoNumber();
            const winningLotto = await this.bonusNumber(winningLottoNumber);
            lottoMachine.calculateMatchResult(
                winningLotto.getLottoNumber(), winningLotto.getBonusNumber()
            );
            Output.printResult(lottoMachine);
            const restart = await this.restart();
            if (restart === 'n') {
                read.close();
                break;
            }
        }
    }

    async amount(){
        while (true) {
            try{
                const answer = await readLine('구입금액을 입력해 주세요.');
                Validator.purchaseAmountValidator(answer);
                return answer;
            } catch(err){
                console.log(`[ERROR] ${err.message}`);
            }
        }
    }

    async winningLotto() {
        while (true) {
            try{
                const answer = await readLine('당첨 번호를 입력해 주세요.');
                const lotto = new Lotto(answer.split(','));
                return lotto;
            } catch(err){
                console.log(`[ERROR] ${err.message}`);
            }
        }
    }

    async bonusNumber(winningLottoNumber) {
        while (true) {
            try{
                const bonusNumber = await readLine('보너스 번호를 입력해 주세요.');
                const winningLotto = new WinningLotto(winningLottoNumber, bonusNumber);
                return winningLotto;
            } catch(err){
                console.log(`[ERROR] ${err.message}`);
            }
        }
    }

    async restart() {
        while (true) {
            try {
                const answer = await readLine('다시 시작하시겠습니까? (y/n)');
                Validator.purchaseAmountValidator(answer);
                return answer;
            } catch (err) {
                console.log(`[ERROR] ${err.message}`);
            }
        }
    }
}

export default App;
