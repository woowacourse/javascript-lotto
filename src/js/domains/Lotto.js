const LOTTO_MAX_NUMBER = 45;
const LOTTO_MIN_NUMBER = 1;

export default class Lotto {
  #numbers = [];

  // 로또에 숫자를 생성
  // 랜덤
  generateNumbers(generateRandomNumber) {
    this.#numbers = Array(6)
      .fill()
      .map(() => generateRandomNumber());
  }

  get numbers() {
    return this.#numbers;
  }

  generateRandomNumber() {
    return (
      Math.random() * (LOTTO_MAX_NUMBER - LOTTO_MIN_NUMBER) + LOTTO_MIN_NUMBER
    );
  }
}
