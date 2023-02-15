export class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers;
  }
}

export const LottoStore = {
  purchase(amount) {
    /** @todo 매직넘버 */
    const TOTAL = amount / 1000;

    return Array(TOTAL)
      .fill('lotto')
      .map(() => new Lotto());
  },
};
