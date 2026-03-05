export class Lotto {
    #numbers;

    constructor(numbers) {
        this.#numbers = numbers;
    }

    getLottoNumber() {
        return [...this.#numbers];
    }
}
