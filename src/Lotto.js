import { LOTTO_RULES } from "./constants.js";

class Lotto {
  #numbers;

  constructor(lottoNumberList) {
    this.#validate(lottoNumberList);
    this.#numbers = [...lottoNumberList].sort((a, b) => a - b);
  }

  #validate(numbers) {
    if (numbers.length !== LOTTO_RULES.NUMBER_COUNT)
      throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
    if (new Set(numbers).size !== LOTTO_RULES.NUMBER_COUNT)
      throw new Error("[ERROR] 로또 번호는 중복되지 않아야 합니다.");
    if (
      numbers.some(
        (n) => n < LOTTO_RULES.MIN_NUMBER || n > LOTTO_RULES.MAX_NUMBER,
      )
    )
      throw new Error("[ERROR] 로또 번호는 1~45 사이여야 합니다.");
  }

  getNumbers() {
    return [...this.#numbers];
  }
}

export default Lotto;
