class LottoMachine {
  compareLottos(lottos, winningLotto, bonusNumber) {
    lottos.forEach((lotto) => {
      this.compareLottoNumbers(winningLotto, lotto);
      this.compareBonusNumber(bonusNumber, lotto);
    });
  }

  compareLottoNumbers(winningLotto, lotto) {
    winningLotto.forEach((winningNumber) => {
      lotto.lottoNumbers.includes(winningNumber) && lotto.addScore();
    });
  }

  compareBonusNumber(bonusNumber, lotto) {
    lotto.lottoNumbers.includes(bonusNumber) &&
      lotto.setIsContainBonusNumber(true);
  }
}

export default LottoMachine;
