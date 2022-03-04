import { LOTTO_RULE, WINNING_PRIZE } from './constants.js';
export default class Model {
  #cash = 0;
  #lottoList = [];
  #winningLottoQuantity = {
    '3개': 0,
    '4개': 0,
    '5개': 0,
    '5개+보너스볼': 0,
    '6개': 0,
  };

  getCash() {
    return this.#cash;
  }

  setCash(cash) {
    this.#cash = cash;
  }

  getLottoList() {
    return this.#lottoList;
  }

  // 테스트를 위한 메서드
  setLottoList(lottoList) {
    this.#lottoList = lottoList;
  }

  getWinningLottoQuantity() {
    return this.#winningLottoQuantity;
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

  setWinningLottoQuantity(pickedNumbers) {
    Object.keys(this.#winningLottoQuantity).map(key => (this.#winningLottoQuantity[key] = 0));

    this.#lottoList.map(lotto => {
      this.#winningLottoQuantity[countSameNumber(lotto, pickedNumbers)] += 1;
    });
  }

  calculateProfitRatio() {
    let totalProfit = 0;
    for (let key in WINNING_PRIZE) {
      totalProfit += WINNING_PRIZE[key] * this.#winningLottoQuantity[key];
    }
    return (totalProfit / this.#cash) * 100;
  }
}

function makeAllLottoNumbers(min, max) {
  return [...Array(max + 1).keys()].slice(min);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function countSameNumber(lotto, pickedNumbers) {
  const winningNumbers = pickedNumbers.slice(0, LOTTO_RULE.NUMBERS_COUNT);
  const bonusNumber = pickedNumbers.slice(-1)[0];

  const winningCount = winningNumbers.filter(element => lotto.includes(element)).length;
  if (winningCount === 5 && lotto.includes(bonusNumber)) {
    return '5개+보너스볼';
  }

  return `${winningCount}개`;
}
