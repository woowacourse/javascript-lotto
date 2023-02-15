import generateRandomNumber from '../utils/generateRandomNumber';
import { values, correctCountsToMoney } from '../constants/values';
import Lotto from './Lotto';

class LottoMachine {
  #lottos;

  constructor() {
    this.init();
  }

  init() {
    this.#lottos = [];
  }

  get lottos() {
    return this.#lottos;
  }

  buyLotto(money) {
    for (let i = 0; i < Math.floor(money / 1000); i++) {
      this.#lottos.push(new Lotto(this.generateLottoNumber()));
    }
  }

  generateLottoNumber() {
    const { LOWER_BOUND, UPPER_BOUND } = values;
    const randomLottoNumbers = [];

    for (let i = 0; i < 6; i++) {
      randomLottoNumbers.push(generateRandomNumber(LOWER_BOUND, UPPER_BOUND));
    }

    return randomLottoNumbers;
  }

  computeCorrectCounts(winningNumber, lottoNumber) {
    const correctCounts = lottoNumber.reduce((acc, cur) => {
      if (winningNumber.includes(cur)) return ++acc;
      return acc;
    }, 0);

    return correctCounts;
  }

  checkLotteryWinnings(lottoNumber, targetNumber) {
    const correctCounts = this.computeCorrectCounts(targetNumber.winningNumber, lottoNumber);

    if (this.isFive(correctCounts)) {
      return correctCountsToMoney[`${correctCounts}`][
        `${this.isSecond(targetNumber.bonusNumber, lottoNumber) ? 0 : 1}`
      ];
    }
    return correctCountsToMoney[correctCounts];
  }

  isFive(correctCounts) {
    return correctCounts === 5;
  }

  isSecond(bonusNumber, lottoNumber) {
    return lottoNumber.includes(bonusNumber);
  }
}

export default LottoMachine;
