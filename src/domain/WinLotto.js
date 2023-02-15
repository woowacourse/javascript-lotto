const Lotto = require("./Lotto");

class WinLotto extends Lotto {
  #bonusNumber;

  constructor(numbers, bonusNumber) {
    super(numbers);
    this.validateBonusNumber(bonusNumber);
    this.#bonusNumber = bonusNumber;
  }

  validateBonusNumber(bonusNumber) {
    if (1 > bonusNumber || bonusNumber > 45) throw new Error();
    if (super.numbers.includes(bonusNumber)) throw new Error();
  }

  //calculateWinLotto(lottos){
  // const sameNumbers = lottos.map((lotto)=> {
  //     sameNumber = lotto.numbers.filter(num => super.numbers.includes(num));

  //     return sameNumber.length;
  // });
  // }
  //}

  calculateWinLotto(lotto) {
    const sameNumbers = lotto.numbers.filter((num) =>
      super.numbers.includes(num)
    );
    if (sameNumbers.length === 6) return 1;
    if (sameNumbers.length === 5)
      return lotto.numbers.includes(this.bonusNumber) ? 2 : 3;
    if (sameNumbers.length === 4) return 4;
    if (sameNumbers.length === 3) return 5;
    if (sameNumbers.length < 3) return 0;
  }

  get bonusNumber() {
    return this.#bonusNumber;
  }
}

[];

module.exports = WinLotto;
