class LottoGame {
  hasBonusNumber(lotto, bonusNumber) {
    if (lotto.includes(bonusNumber)) {
      return true;
    }

    return false;
  }
}

export default LottoGame;
