class PurchaseAmount {
    #price;

    constructor(price) {
        this.#validatePrice(price);
        this.#price = price;
    }

    #validatePrice(price) {
        if (price % 1000 !== 0) throw new Error();
    }
}

export default PurchaseAmount;