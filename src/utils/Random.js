class Random {
  static generateRandomNumberInRange(start, end) {
    return start + Math.round(Math.random() * (end - start));
  }

  static generateUniqueRandomNumbersInRange(start, end, count) {
    const lottoNumbers = [];

    while (lottoNumbers.length < count) {
      const randomNumber = this.generateRandomNumberInRange(start, end);

      !lottoNumbers.includes(randomNumber) && lottoNumbers.push(randomNumber);
    }

    return lottoNumbers;
  }
}

export default Random;
