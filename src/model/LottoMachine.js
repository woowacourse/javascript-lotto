import generateRandomNumber from '../utils/generateRandomNumber';
import { values, correctCountsToMoney, prize } from '../constants/values';
import Lotto from './Lotto';

class LottoMachine {
  #lottos;
  #statistics = {
    ranks: new Array(6).fill(0),
    rateOfProfit: null,
  };

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
    const targetLottoLength = Math.floor(money / 1000);

    while (this.#lottos.length < targetLottoLength) {
      this.#lottos.push(new Lotto(this.generateLottoNumber()));
    }
  }

  generateLottoNumber() {
    const { LOWER_BOUND, UPPER_BOUND } = values;
    const randomLottoNumbers = [];

    while (randomLottoNumbers.length !== values.LOTTO_LENGTH) {
      const randomNumber = generateRandomNumber(LOWER_BOUND, UPPER_BOUND);
      if (!randomLottoNumbers.includes(randomNumber)) randomLottoNumbers.push(randomNumber);
    }

    return randomLottoNumbers.sort((prev, next) => prev - next);
  }

  calculateStatistics(winningNumber, bonusNumber) {
    const targetNumber = {
      winningNumber,
      bonusNumber,
    };

    const totalRanks = this.calculateRanks(targetNumber);
    totalRanks.forEach(rank => {
      this.#statistics.ranks[rank - 1]++;
    });

    this.#statistics.rateOfProfit = this.rateOfProfit(this.calcaulateTotalSum(totalRanks), totalRanks.length);

    return this.#statistics;
  }

  calcaulateTotalSum = ranks => ranks.reduce((acc, curr) => acc + prize[curr - 1], 0);

  calculateRanks(targetNumber) {
    return this.#lottos.map(lotto => this.checkLotteryWinnings(lotto.lottoNum, targetNumber));
  }

  computeCorrectCounts(winningNumber, lottoNumber) {
    return lottoNumber.reduce((acc, cur) => {
      if (winningNumber.includes(cur)) return ++acc;
      return acc;
    }, 0);
  }

  checkLotteryWinnings(lottoNumber, targetNumber) {
    const correctCounts = this.computeCorrectCounts(targetNumber.winningNumber, lottoNumber);

    if (this.isFive(correctCounts)) {
      return correctCountsToMoney[`${correctCounts}`][
        `${this.isSecond(targetNumber.bonusNumber, lottoNumber) ? 0 : 1}`
      ].rank;
    }
    return correctCountsToMoney[correctCounts].rank;
  }

  isFive(correctCounts) {
    return correctCounts === 5;
  }

  isSecond(bonusNumber, lottoNumber) {
    return lottoNumber.includes(bonusNumber);
  }

  lotteryWinningsSum(lottos, targetNumber) {
    return lottos.reduce((acc, lotto) => acc + this.checkLotteryWinnings(lotto, targetNumber), 0);
  }

  rateOfProfit(lotteryWinningsSum, lottosLength) {
    const { LOTTO_PRICE } = values;
    const spentMoney = lottosLength * LOTTO_PRICE;

    return ((lotteryWinningsSum - spentMoney) / spentMoney) * 100;
  }
}

export default LottoMachine;
