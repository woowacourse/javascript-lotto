class LottoMachine {
  compareLottos(lottos, winningLotto, bonusNumber, lottoScore) {
    lottos.forEach((lotto, index) => {
      this.compareLottoNumbers(winningLotto, lotto);
      this.compareBonusNumber(bonusNumber, lotto, index, lottoScore);
    });
  }

  compareLottoNumbers(winningLotto, lotto) {
    winningLotto.forEach((winningNumber) => {
      lotto.lottoNumbers.includes(winningNumber) && lotto.addScore();
    });
  }

  compareBonusNumber(bonusNumber, lotto, index, lottoscore) {
    lotto.lottoNumbers.includes(bonusNumber) &&
      lottoscore.setIsContainBonusNumber(index, true);
  }
}

export default LottoMachine;
