import { LOTTO_NUMBERS, ALERT_MESSAGE } from '../constants/index';

export default class LottoModel {
  constructor() {
    this.lottoCount = 0;
    this.lottos = [];
    this.winningLottoNumbers = {
      winningNumbers: [],
      bonus: 0,
    };
    this.winningType = {
      3: 0,
      4: 0,
      5: 0,
      5.5: 0,
      6: 0,
    };
  }

  setLottoCount(value) {
    this.checkValidLottoCount(value);
    this.lottoCount = value / LOTTO_NUMBERS.THOUSAND;
  }

  getLottoCount() {
    return this.lottoCount;
  }

  checkValidLottoCount(value) {
    if (!this.isNumber(value)) {
      throw Error(ALERT_MESSAGE.MUST_NUMBER);
    }
    if (!this.isOverThousand(value)) {
      throw Error(ALERT_MESSAGE.OVER_THOUSAND_INPUT);
    }
    if (!this.isDividedThousand(value)) {
      throw Error(ALERT_MESSAGE.DIVIDED_BY_THOUSAND);
    }
  }

  checkValidWinningNumbers(value) {
    if (this.isOverRangeNumbers(value)) {
      throw Error(ALERT_MESSAGE.OUT_OF_BOUNDS);
    }
    if (this.isDuplicateWinningNumbers(value)) {
      throw Error(ALERT_MESSAGE.DUPLICATED_NUMBERS);
    }
  }

  isDividedThousand = (value) => value % LOTTO_NUMBERS.THOUSAND === 0;

  isOverThousand = (value) => value >= LOTTO_NUMBERS.THOUSAND;

  isNumber = (value) => value.match(/[0-9]/);

  isDuplicateWinningNumbers = (value) => [...new Set(value)].length !== value.length;

  isOverRangeNumbers = (value) =>
    value.some(
      (elem) => elem > LOTTO_NUMBERS.MAX_LOTTO_NUMBER || elem < LOTTO_NUMBERS.MIN_LOTTO_NUMBER,
    );

  isAllNumber = (value) => value.every((elem) => typeof elem === 'number');

  getRandomNumber = (min, max) => Math.floor(Math.random() * max + min);

  getLottoNumbers() {
    const lottoNumberSet = new Set();
    while (lottoNumberSet.size < LOTTO_NUMBERS.LOTTO_LENGTH) {
      lottoNumberSet.add(
        this.getRandomNumber(LOTTO_NUMBERS.MIN_LOTTO_NUMBER, LOTTO_NUMBERS.MAX_LOTTO_NUMBER),
      );
    }
    return [...lottoNumberSet];
  }

  generateLottos() {
    const lottos = [];
    for (let i = 0; i < this.getLottoCount(); i += 1) {
      lottos.push(this.getLottoNumbers());
    }

    return lottos;
  }

  setLottos(lottos) {
    this.lottos = lottos;
  }

  getLottos() {
    return this.lottos;
  }

  setWinningLottoNumbers(winnerNumberArray, bonusNumber) {
    this.checkValidWinningNumbers(this.getTotalWinningLottoNumbers(winnerNumberArray, bonusNumber));

    this.winningLottoNumbers.winningNumbers = winnerNumberArray;
    this.winningLottoNumbers.bonus = bonusNumber;
  }

  getTotalWinningLottoNumbers(winnerNumberArray, bonusNumber) {
    return [].concat(winnerNumberArray, bonusNumber);
  }

  calculateWinningNumbers() {
    this.lottos.forEach((lotto) => {
      let winningCount =
        2 * lotto.length -
        [...new Set(lotto.concat(this.winningLottoNumbers.winningNumbers))].length;

      if (winningCount === 5 && lotto.includes(this.winningLottoNumbers.bonus)) {
        winningCount += 0.5;
      }

      if (winningCount >= 3) {
        this.winningType[winningCount] += 1;
      }
    });

    return this.winningType;
  }

  initWinningType() {
    this.winningType = {
      3: 0,
      4: 0,
      5: 0,
      5.5: 0,
      6: 0,
    };
  }

  calculateEarningRate() {
    const winningPriceInfo = {
      3: LOTTO_NUMBERS.FIFTH_WINNINGS,
      4: LOTTO_NUMBERS.FOURTH_WINNINGS,
      5: LOTTO_NUMBERS.THIRD_WINNINGS,
      5.5: LOTTO_NUMBERS.SECOND_WINNINGS,
      6: LOTTO_NUMBERS.FIRST_WINNINGS,
    };

    return Math.floor(
      (Object.entries(this.winningType).reduce(
        (acc, cur) => acc + winningPriceInfo[cur[0]] * cur[1],
        0,
      ) /
        (this.lottoCount * LOTTO_NUMBERS.THOUSAND)) *
        100,
    );
  }

  initGame() {
    this.lottoCount = 0;
    this.lottos = [];
    this.winningLottoNumbers = {
      winningNumbers: [],
      bonus: 0,
    };
    this.winningType = {
      3: 0,
      4: 0,
      5: 0,
      5.5: 0,
      6: 0,
    };
  }
}
