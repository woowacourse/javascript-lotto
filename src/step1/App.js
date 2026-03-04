import { readLine, read } from './Utils.js';

class App {
    async run() {
        const amount = await this.amount();
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
                read.close();
                return answer;
            } catch(err){
                console.log(`[ERROR] ${err.message}`);
            }
        }
    }
}

export default App;
