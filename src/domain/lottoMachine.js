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
}

export default LottoMachine;
