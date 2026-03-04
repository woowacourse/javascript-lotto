import { readLine, read } from './Utils.js';
import { LottoMachine } from './LottoMachine.js';

class App {
    async run() {
        const amount = await this.amount();
        const lottoMachine = new LottoMachine(amount)
        const winngNumber = await this.winningNumber()
        read.close();
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

    async winningNumber() {
        while (true) {
            try{
                const answer = await readLine('당첨 번호를 입력해 주세요.');
                const numbers = answer.split(',');
                if (new Set(numbers).size !== 6){
                    throw new Error('중복 당첨 번호 입력은 불가 합니다.');
                }
                numbers.forEach(number => {
                    if (!Number.isInteger(Number(number))) {
                        throw new Error('당첨 번호는 숫자만 입력 가능합니다.');
                    }
                    if (Number(number) > 45 || Number(number) < 0) {
                        throw new Error('1 ~ 45 이내 숫자만 입력 가능합니다.');
                    }
                });
                return numbers;
            } catch(err){
                console.log(`[ERROR] ${err.message}`);
            }
        }
    }
}

export default App;
