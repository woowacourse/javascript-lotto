export default class Lotto {
  constructor() {
    this.numbers = this.generateRandomNumbers()
  }

  generateRandomNumbers() {
    const randomNumbers = Array.from({ length: 45 }, (_, i) => i + 1);

    randomNumbers.sort(() => Math.random() - Math.random());

    return randomNumbers.slice(0, 6).sort((a, b) => a - b);
  }
}