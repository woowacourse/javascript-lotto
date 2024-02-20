class LottoCalculator {
  constructor(winningNumbers, lottoNumbers) {
    this.compare(winningNumbers, lottoNumbers);
  }

  compare(winningNumbers, lottoNumbers) {
    return winningNumbers.filter((winningNumber) =>
      lottoNumbers.includes(winningNumber),
    ).length;
  }
}

export default LottoCalculator;
