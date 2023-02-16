const LottoValidator = require('../validators/LottoValidator');

class LottoTicket {
  #numbers;

  constructor(numbers) {
    LottoValidator.checkLottoNumbers(numbers);
    this.#numbers = numbers;
  }

  countMatchedNumbers(winningNumbers) {
    return this.#numbers.filter((number) => winningNumbers.includes(number)).length;
  }
}

module.exports = LottoTicket;
