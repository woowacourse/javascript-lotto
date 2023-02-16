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

    while (randomLottoNumbers.length !== values.LOTTO_LENGTH) {
      const randomNumber = generateRandomNumber(LOWER_BOUND, UPPER_BOUND);
      if (!randomLottoNumbers.includes(randomNumber)) randomLottoNumbers.push(randomNumber);
    }

    return randomLottoNumbers.sort((prev, next) => prev - next);
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

  lotteryWinningsSum(lottos, targetNumber) {
    const lotteryWinningsSum = lottos.reduce(
      (acc, lotto) => acc + this.checkLotteryWinnings(lotto, targetNumber),
      0,
    );

    return lotteryWinningsSum;
  }

  rateOfProfit(lotteryWinningsSum, lottosLength) {
    const { LOTTO_PRICE } = values;
    const spentMoney = lottosLength * LOTTO_PRICE;

    return (lotteryWinningsSum - spentMoney) / spentMoney;
  }
}

export default LottoMachine;
