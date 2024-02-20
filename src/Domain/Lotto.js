import LottoNumber from "./LottoNumber";

export default class Lotto extends LottoNumber {
  #rank;

  #winCount = 0;

  #isBonus = false;

  constructor(numbers) {
    super(numbers);
  }

  calculateRank(winNumbersObject) {
    const { winNumbers, bonusNumber } = winNumbersObject;
    this.#compareWinNumber(winNumbers);
    this.#compareBonusNumber(bonusNumber);
    this.#setRankByfield();
  }

  #compareWinNumber(winNumbers) {
    const thisLottoNumbers = this.getLottoNumbers();
    winNumbers.forEach((winNumber) => {
      if (thisLottoNumbers.includes(winNumber)) {
        this.#winCount += 1;
      }
    });
  }

  #compareBonusNumber(bonusNumber) {
    const thisLottoNumbers = this.getLottoNumbers();
    if (this.#winCount === 5 && thisLottoNumbers.includes(bonusNumber)) {
      this.#isBonus = true;
    }
  }

  #setRankByfield() {
    if (this.#winCount === 6) this.#rank = 1;
    if (this.#winCount === 5 && this.#isBonus) this.#rank = 2;
    if (this.#winCount === 5 && !this.#isBonus) this.#rank = 3;
    if (this.#winCount === 4) this.#rank = 4;
    if (this.#winCount === 3) this.#rank = 5;
  }

  getRank() {
    return this.#rank;
  }
}
