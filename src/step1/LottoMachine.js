import { pickNumberInRange } from './Utils.js';

export class LottoMachine {

    #amount;
    #lottos;

    constructor(amount) {
        this.#amount = amount;
        this.purchaseCount = amount / 1000;
    }

    createLotto() {
        return pickNumberInRange(1, 45, 6);
    }
}
