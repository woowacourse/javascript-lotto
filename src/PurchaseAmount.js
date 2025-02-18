import ERROR_MESSAGE from "./constant/error.js";
import { PRICE } from "./constant/price.js";

class PurchaseAmount {
    #price;

    constructor(price) {
        this.#validatePrice(price);
        this.#price = Number(price);
    }

    #validatePrice(price) {
        if (isNaN(price)) throw new Error(ERROR_MESSAGE.NOT_A_NUMBER);
        if (price < PRICE.UNIT) throw new Error(ERROR_MESSAGE.UNDER_MIN_PRICE);
        if (price > PRICE.MAX) throw new Error(ERROR_MESSAGE.EXCEED_MAX_PRICE);
        if (price % PRICE.UNIT !== 0) throw new Error(ERROR_MESSAGE.NOT_DIVIDED_1000);
    }

    get price() {
        return this.#price;
    }
}

export default PurchaseAmount;
