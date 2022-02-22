const generateRandomNumber = () => Math.floor(Math.random() * 45) + 1;

export default class Lotto {
  constructor() {
    this.lottoNumbers = [];
    this.generateLottoNumbers();
  }

  generateLottoNumbers = () => {
    while (this.lottoNumbers.length < 6) {
      const randomNumber = generateRandomNumber();
      if (!this.lottoNumbers.includes(randomNumber)) {
        this.lottoNumbers.push(randomNumber);
      }
    }
  };
}
