class LottoCalculator {
  constructor(lottoNumbers, generatedLottos) {}

  compare(winningNumbers, generatedLottos) {
    return winningNumbers.filter((winningNumber) =>
      generatedLottos.includes(winningNumber),
    ).length;
  }
}

export default LottoCalculator;
