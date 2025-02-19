class LottoMachine {
  getLottoCount(input) {
    const lottoCount = input / 1000;
    return lottoCount;
  }

  drawRandomNumbers(min, max, count) {
    const randomNumbers = [];
    while (randomNumbers.length < count) {
      const randomNumber = Math.floor(Math.random() * max + min);
      if (!randomNumbers.includes(randomNumber)) {
        randomNumbers.push(randomNumber);
      }
    }

    randomNumbers.sort((a, b) => a - b);
    return randomNumbers;
  }

  drawLotto(count) {
    return Array.from({ length: count }).map(() => {
      const randomNumber = this.drawRandomNumbers(1, 45, 6);
      return new Lotto(randomNumber);
    });
  }
}

export default LottoMachine;
