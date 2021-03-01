export class Lotto {
  #type;
  #numbers;

  constructor(type, numbers) {
    this.#type = type;
    this.#numbers = numbers.sort((a, b) => {
      return a - b;
    });
  }

  get type() {
    return this.#type;
  }

  get numbers() {
    return this.#numbers;
  }
}
