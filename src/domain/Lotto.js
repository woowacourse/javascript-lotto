class Lotto {
  constructor(lottoNumbers) {
    this.lottoNumbers = lottoNumbers;
  }

  countMatchingNumbers(winningNumbers) {
    const matchingNumbers = winningNumbers.map((number) => {
      if (this.lottoNumbers.includes(number)) return number;
    });
    return matchingNumbers.length;
  }
}

export default Lotto;
