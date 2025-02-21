import validateLottoNumber from '../validations/validate/lottoNumberValidate.js';
import { RANKING, RANKING_ERROR_MESSAGES } from '../constants/constants.js';

class Lotto {
  #numbers;
  #ranking;

  constructor(numbers) {
    this.#numbers = numbers.sort((a, b) => a - b);
    this.#validate();
  }

  set ranking(ranking){
    const isValidRanking = Object.values(RANKING).some(rank => rank.RANK === ranking);
    if(!isValidRanking && ranking!==null){
      throw new Error(RANKING_ERROR_MESSAGES)
    }
    this.#ranking=ranking
  }

  #validate() {
    validateLottoNumber(this.#numbers);
  }

  isContained(winningNumber) {
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
