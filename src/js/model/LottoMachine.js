import generateRandomNumber from '@lotto/utils/generateRandomNumber';
import { values, correctCountsToMoney } from '@lotto/constants/values';
import Lotto from '@lotto//model/Lotto';
import LottoResultCalculator from '@lotto//model/LottoResultCalculator';
import lotto from '@lotto//model/Lotto';

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
    this.#lottos = [];
    const targetLottoLength = Math.floor(money / 1000);

    while (this.#lottos.length < targetLottoLength) {
      this.#lottos.push(new Lotto(this.generateLottoNumber()));
    }
  }

  generateLottoNumber() {
    const { LOWER_BOUND, UPPER_BOUND } = values;
    const randomLottoNumbers = new Set();

    while (randomLottoNumbers.size < values.LOTTO_LENGTH) {
      const randomNumber = generateRandomNumber(LOWER_BOUND, UPPER_BOUND);
      randomLottoNumbers.add(randomNumber);
    }

    return [...randomLottoNumbers].sort((prev, next) => prev - next);
  }

  calculateStatistics(winningNumber, bonusNumber) {
    const targetNumber = {
      winningNumber,
      bonusNumber,
    };

    const totalRanks = this.calculateRanks(targetNumber);

    return new LottoResultCalculator().calculateStatistics(totalRanks);
  }

  calculateRanks(targetNumber) {
    return this.#lottos.map(lotto => this.checkLotteryWinnings(lotto.lottoNum, targetNumber));
  }

  computeCorrectCounts(winningNumber, lottoNumber) {
    return lottoNumber.reduce((acc, cur) => {
      if (winningNumber.includes(cur.toString())) return ++acc;
      return acc;
    }, 0);
  }

  checkLotteryWinnings(lottoNumber, targetNumber) {
    const correctCounts = this.computeCorrectCounts(targetNumber.winningNumber, lottoNumber);

    if (correctCounts === 5) {
      return correctCountsToMoney[`${correctCounts}`][
        `${lottoNumber.includes(targetNumber.bonusNumber) ? 0 : 1}`
      ].rank;
    }

    return correctCountsToMoney[correctCounts].rank;
  }

  lotteryWinningsSum(lottos, targetNumber) {
    return lottos.reduce((acc, lotto) => acc + this.checkLotteryWinnings(lotto, targetNumber), 0);
  }
}

export default LottoMachine;
