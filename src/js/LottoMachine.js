import ValidationError from './ValidationError';
import { MIN_CHARGE_INPUT, ERROR_MESSAGE } from './constants.js';

export default class LottoMachine {
    constructor() {}

    validateCharge(charge) {
        if(charge < MIN_CHARGE_INPUT) throw new ValidationError(ERROR_MESSAGE.MIN_CHARGE_INPUT);
    }
}