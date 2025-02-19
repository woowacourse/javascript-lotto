class LottoMachine {
  getLottoCount(input) {
    const lottoCount = input / 1000;
    return lottoCount;
  }

  drawRandomNumbers() {
    const randomNumbers = [];
    while (randomNumbers.length < 6) {
      const randomNumber = Math.floor(Math.random() * 45 + 1);
      if (!randomNumbers.includes(randomNumber)) {
        randomNumbers.push(randomNumber);
      }
    }

    randomNumbers.sort((a, b) => a - b);
    return randomNumbers;
  }
}

export default LottoMachine;
