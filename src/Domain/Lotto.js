import LottoNumber from "./LottoNumber";

const COUNT_TO_RANK_OBJ = {
  6: 1,
  4: 4,
  3: 5,
};

const POTENTIAL_2_OR_3_COUNT = 5;
const POTENTIAL_2_OR_3_RANK = {
  true: 2,
  false: 3,
};

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
    if (
      this.#winCount === POTENTIAL_2_OR_3_COUNT &&
      thisLottoNumbers.includes(bonusNumber)
    ) {
      this.#isBonus = true;
    }
  }

  #setRankByfield() {
    if (this.#winCount === POTENTIAL_2_OR_3_COUNT) {
      this.#rank = POTENTIAL_2_OR_3_RANK[this.#isBonus];
      return;
    }
    this.#rank = COUNT_TO_RANK_OBJ[this.#winCount];
  }

  getRank() {
    return this.#rank;
  }
}
