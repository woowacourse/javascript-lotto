import LottoValidator from '../validators/LottoValidator';

class LottoTicket {
  #numbers;

  constructor(numbers) {
    LottoValidator.checkLottoNumbers(numbers);
    this.#numbers = numbers;
  }

  hasBonusNumber(number) {
    return this.#numbers.includes(number);
  }

  countMatchedNumbers(winningNumbers) {
    return this.#numbers.filter((number) => winningNumbers.includes(number)).length;
  }

  getNumbers() {
    return this.#numbers;
  }
}

export default LottoTicket;
