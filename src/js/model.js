import { LOTTO_RULE } from './constants.js';
export default class Model {
  #lottoList = [];

  getLottoList() {
    return this.#lottoList;
  }

  buyLotto(quantity) {
    this.#lottoList = [];
    for (let i = 0; i < quantity; i++) {
      this.#lottoList.push(this.makeLottoNumbers());
    }
  }

  makeLottoNumbers() {
    return shuffle(makeAllLottoNumbers(LOTTO_RULE.MIN_NUMBER, LOTTO_RULE.MAX_NUMBER)).slice(
      0,
      LOTTO_RULE.NUMBERS_COUNT,
    );
  }
}

function makeAllLottoNumbers(min, max) {
  const result = [];
  for (let i = min; i <= max; i++) {
    result.push(i);
  }
  return result;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
