import { LOTTO_RULES } from "../Utils/Constants.js";

class Lotto {
  #numbers;

  constructor(numbers) {
    const nums = numbers.map(Number);
    this.#validate(nums);
    this.#numbers = nums;
  }

  #validate(nums) {
    const hasNaN = nums.some((n) => Number.isNaN(n));
    if (hasNaN) {
      throw new Error("[ERROR] 각 번호가 숫자가 아닙니다!");
    }

    const isOutRange = nums.some((n) => n < LOTTO_RULES.MIN_NUMBER || n > LOTTO_RULES.MAX_NUMBER);
    if (isOutRange) {
      throw new Error(`[ERROR] 당첨 번호는 ${LOTTO_RULES.MIN_NUMBER}~${LOTTO_RULES.MAX_NUMBER} 범위여야 합니다!`);
    }

    if (nums.length !== LOTTO_RULES.LENGTH) {
      throw new Error(`[ERROR] 번호는 ${LOTTO_RULES.LENGTH}개여야 합니다!`);
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
  getFormattedNumbers() {
    return `[${this.#numbers.join(", ")}]`;
  }
}

export default Lotto;
