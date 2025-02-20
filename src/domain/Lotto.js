import validateLottoNumber from '../validations/validate/LottoNumberValidate.js';

class Lotto {
  #numbers;
  #ranking;

  constructor(numbers) {
    this.#numbers = numbers.sort((a, b) => a - b);
    this.#validate();
  }

  set ranking(ranking){
    this.#ranking=ranking
  }

  #validate() {
    validateLottoNumber(this.#numbers);
  }

  includeNumber(winningNumber) {
    return this.#numbers.includes(winningNumber);
  }

  get numbers() {
    return this.#numbers;
  }

  get ranking(){
    return this.#ranking;
  }
}

export default Lotto;
