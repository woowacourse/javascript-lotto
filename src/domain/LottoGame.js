class LottoGame {
  getLottoMatchedResult(lotto, winningLotto, bonusNumber) {
    const matchedCount = this.getMatchedLottoCount(lotto, winningLotto);
    const hasBonusNumber = this.checkBonusNumber(lotto, bonusNumber);
    const lottoMatchedResult = { matchedCount, hasBonusNumber };

    return lottoMatchedResult;
  }

  getMatchedLottoCount(lotto, winningLotto) {
    const matchedCount = winningLotto.filter((lottoNumber) => lotto.includes(lottoNumber)).length;

    return matchedCount;
  }

  checkBonusNumber(lotto, bonusNumber) {
    if (lotto.includes(bonusNumber)) {
      return true;
    }

    return false;
  }
}

export default LottoGame;
