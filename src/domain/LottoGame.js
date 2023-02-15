class LottoGame {
  getMatchedLottoCount(lotto, winningLotto) {
    const matchedCount = winningLotto.filter((lottoNumber) => lotto.includes(lottoNumber)).length;

    return matchedCount;
  }

  hasBonusNumber(lotto, bonusNumber) {
    if (lotto.includes(bonusNumber)) {
      return true;
    }

    return false;
  }
}

export default LottoGame;
