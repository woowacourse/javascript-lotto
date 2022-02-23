import ValidationError from './ValidationError';
import { MIN_CHARGE_INPUT, ERROR_MESSAGE } from './constants';
import { $ } from './util';

export default class LottoMachine {
    constructor() {
        this.setEvent();
    }

    setEvent() {
        $("#charge-submit-form").addEventListener("submit", this.onSubmitCharge.bind(this));
    }

    onSubmitCharge(event) {
        event.preventDefault();
        const number = $("#charge-input").value;
        try {
            this.validateCharge(number);
        } catch (error) {
            alert(error.message);
            return;
        }
        console.log("Validation Pass!");
    }

    validateCharge(charge) {
        if (charge < MIN_CHARGE_INPUT) throw new ValidationError(ERROR_MESSAGE.MIN_CHARGE_INPUT);
    }
}