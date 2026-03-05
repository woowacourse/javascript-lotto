import { pickNumberInRange } from './Utils.js';

export class LottoMachine {

    #amount;
    #lottos;

    constructor(amount) {
        this.#amount = amount;
        this.purchaseCount = amount / 1000;
    }

    getLotto(){
        let lottos = []
        for(let i = 0 ; i < this.purchaseCount; i ++){
            const lotto = this.createLotto().sort((a, b) => a - b);
            lottos.push(lotto)
        }
        return lottos
    }

    calculateMatchResult(winningNumber, bonusNumber) {

    }

    createLotto() {
        return pickNumberInRange(1, 45, 6);
    }
}
