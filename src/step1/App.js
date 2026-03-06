import { readLine, read } from './Utils.js';
import { Lotto } from './Lotto.js';
import { LottoMachine } from './LottoMachine.js';
import { Output } from './Output.js';

class App {
    async run() {
        while(true) {
            const amount = await this.amount();
            const lottoMachine = new LottoMachine(amount)
            Output.printPurchaseLottoCount(lottoMachine.purchaseCount);
            Output.printLottos(lottoMachine.lottos);
            const winningLotto = await this.winningLotto();
            const winningLottoNumber = winningLotto.getLottoNumber()
            const bonusNumber = await this.bonusNumber(winningLottoNumber);
            lottoMachine.calculateMatchResult(
                winningLottoNumber.map((lottoNumber) => Number(lottoNumber)), bonusNumber
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
                if (!Number.isInteger(Number(answer))) {
                    throw new Error('숫자만 입력해 주세요.');
                }
                if (Number(answer) % 1000 !== 0) {
                    throw new Error('1000원 단위만 입력 가능합니다.');
                }
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

    async bonusNumber(winningNumber) {
        while (true) {
            try{
                const number = await readLine('보너스 번호를 입력해 주세요.');
                if (!Number.isInteger(Number(number))) {
                    throw new Error('보너스 번호는 숫자여야 합니다.');
                }
                if (Number(number) > 45 || Number(number) < 0) {
                    throw new Error('보너스 번호는 1 ~ 45 이내 숫자여야 합니다.');
                }
                if (new Set([...winningNumber, number]).size !== 7) {
                    throw new Error('보너스 번호는 당첨 번호와 중복될 수 없습니다.');
                }
                return number;
            } catch(err){
                console.log(`[ERROR] ${err.message}`);
            }
        }
    }

    async restart() {
        while (true) {
            try {
                const answer = await readLine('다시 시작하시겠습니까? (y/n)');
                if (!['y', 'n'].includes(answer)) {
                    throw new Error('다시시작 입력은 y 또는 n 만 입력 가능합니다.');
                }
                return answer;
            } catch (err) {
                console.log(`[ERROR] ${err.message}`);
            }
        }
    }
}

export default App;
