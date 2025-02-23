import Lotto from './Lotto.js';

export default class WinningLotto extends Lotto {
  #bonusNumber;

  constructor(winningNumbers, bonusNumber) {
    super(winningNumbers); // Lotto를 상속받았으므로 #numbers에는 winningNumbers가 담기게 됨
    this.#bonusNumber = bonusNumber;
  }

  getBonusNumber() {
    return this.#bonusNumber;
  }
}
