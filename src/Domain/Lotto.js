import Validator from "../Utils/Validator.js";

class Lotto {
  #numbers;

  constructor(numbers) {
    Validator.validateCommonNumbers(numbers);
    this.#numbers = numbers;
  }

  // 당첨 번호 일치 개수 세기
  countMatches(winningNumbers) {
    return this.#numbers.filter((num) => winningNumbers.includes(num)).length;
  }

  // 보너스 번호 포함 여부 확인
  hasBonus(bonusNumber) {
    return this.#numbers.includes(bonusNumber);
  }

  // 로또 번호 배열을 문자열 형태로 표현
  toString() {
    return `[${this.#numbers.join(", ")}]`;
  }
}

export default Lotto;
