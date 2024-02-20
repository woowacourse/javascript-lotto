import Lotto from "./Lotto";

class LottoStore {
  static #validateAmountType(amount) {
    const regex = /^[1-9]\d*$/;
    if (!regex.test(amount)) {
      throw new Error("[ERROR]");
    }
  }

  static #validateAmountDivision(amount) {
    if (amount % 1000 !== 0) {
      throw new Error("[ERROR]");
    }
  }

  static #validatePurchaseAmount(amount) {
    this.#validateAmountType(amount);
    this.#validateAmountDivision(amount);
  }

  static #pickRandomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min) + 1);
  }

  static #makeLottoNumbers() {
    const numbers = [];
    while (numbers.length < 6) {
      const randomNumber = this.#pickRandomNumberInRange(1, 45);
      if (numbers.includes(randomNumber)) continue;
      numbers.push(randomNumber);
    }

    return numbers;
  }

  static purchaseLottos(amount) {
    const numericAmount = Number(amount);
    this.#validatePurchaseAmount(numericAmount);

    const lottoCount = numericAmount / 1000;
    const lottos = Array.from({ length: lottoCount }).map(() => {
      const lottoNumbers = this.#makeLottoNumbers();
      return new Lotto(lottoNumbers);
    });

    return lottos;
  }
}

export default LottoStore;
