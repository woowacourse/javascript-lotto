class Lotto {
  constructor(lottoNumbers) {
    this.lottoNumbers = lottoNumbers;
  }

  countMatchingNumbers(winningNumbers) {
    return winningNumbers.filter((number) => this.lottoNumbers.includes(number)).length;
  }

  hasBonusNumber(bonusNumber) {
    return this.lottoNumbers.includes(bonusNumber);
  }
}

export default Lotto;
