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

  getRank(matchedCount, hasBonusNumber) {
    if (matchedCount === 6) return 1;
    if (matchedCount === 5 && hasBonusNumber) return 2;
    if (matchedCount === 5) return 3;
    if (matchedCount === 4) return 4;
    if (matchedCount === 3) return 5;

    return 0;
  }
}

export default LottoGame;
