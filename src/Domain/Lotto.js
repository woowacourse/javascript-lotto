class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
    }
    if (new Set(numbers).size !== numbers.length) {
      throw new Error("[ERROR] 중복된 숫자가 있습니다.");
    }
  }

  // numbers 읽는 메서드
  getNumbers() {
    return this.#numbers;
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
