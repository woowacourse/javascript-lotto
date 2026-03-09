import Validator from "../Utils/Validator.js";

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(nums) {
    const hasNaN = nums.some((n) => Number.isNaN(n));
    if (hasNaN) {
      throw new Error("[ERROR] 각 번호가 숫자가 아닙니다!");
    }

    const isOutRange = nums.some((n) => n < 1 || n > 45);
    if (isOutRange) {
      throw new Error(`[ERROR] 당첨 번호는 1~45 범위여야 합니다!`);
    }

    if (nums.length !== 6) {
      throw new Error(`[ERROR] 번호는 6개여야 합니다!`);
    }

    if (new Set(nums).size !== nums.length) {
      throw new Error("[ERROR] 중복된 숫자가 있습니다.");
    }

    return nums;
  }

  // 당첨 번호 일치 개수 세기
  countMatches(winningNumbers) {
    return this.#numbers.filter((num) => winningNumbers.includes(num)).length;
  }

  // 보너스 번호 포함 여부 확인
  hasBonus(bonusNumber) {
    return this.#numbers.includes(bonusNumber);
  }

  getNumbers() {
    return this.#numbers;
  }

  // 로또 번호 배열을 문자열 형태로 표현
  toString() {
    return `[${this.#numbers.join(", ")}]`;
  }
}

export default Lotto;
