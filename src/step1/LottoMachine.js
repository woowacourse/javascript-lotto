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
        for(i = 0 ; i < this.purchaseCount; i ++){
            const lotto = this.createLotto()
            lottos.push(lotto)
        }
        return lottos
    }

    createLotto() {
        return pickNumberInRange(1, 45, 6);
    }
}
