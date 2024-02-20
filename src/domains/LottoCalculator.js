class LottoCalculator {
  constructor(lottoNumbers, generatedLottos) {}

  compare(winningNumbers, generatedLottos) {
    return winningNumbers.filter((winningNumber) =>
      generatedLottos.includes(winningNumber),
    ).length;
  }

  isEqualBonusNumber(bonusNumber, generatedLottos) {
    return generatedLottos.includes(bonusNumber);
  }
}

export default LottoCalculator;
