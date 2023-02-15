class LottoGame {
  constructor() {}

  validateBonusNumber(winningNumbers, bonusNumber) {
    if (this.#isDuplicateFor(winningNumbers, bonusNumber)) {
      throw new Error(
        '[ERROR] 당첨 번호와 보너스 번호에 중복이 존재할 수 없습니다.'
      );
    }
  }

  #isDuplicateFor(winningNumbers, bonusNumber) {
    return winningNumbers.includes(bonusNumber);
  }
}

module.exports = LottoGame;
