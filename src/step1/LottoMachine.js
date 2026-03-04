import { pickNumberInRange } from './Utils.js';

export class LottoMachine {
    constructor() {}

    createLotto() {
        return pickNumberInRange(1, 45, 6);
    }
}
