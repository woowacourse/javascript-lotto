import Lotto from './Lotto.js';
import { LOTTO } from '../utils/constants.js';
import { generateRandomNumber, sortNumbers } from '../utils/common.js';

export default class LottoManager {
  constructor(lottos = []) {
    this.lottos = lottos;
    this.listeners = [];
    this.winningCount = null;
    // this.message = '';
    this.rewards = Object.freeze({
      '1등': 2000000000,
      '2등': 300000000,
      '3등': 1500000,
      '4등': 50000,
      '5등': 5000,
    });
  }

  createLottos(lottoCount) {
    const lottos = Array.from(
      { length: lottoCount },
      () => new Lotto(this.generateLottoNumbers()),
    );

    this.setState({ lottos });
  }

  decideWinners(winningNumbers, bonusNumber) {
    const winningNumbersTemp = {
      '1등': 0,
      '2등': 0,
      '3등': 0,
      '4등': 0,
      '5등': 0,
    };

    this.lottos.forEach(lotto => {
      const numbers = lotto.numbers;
      let count = 0;
      numbers.forEach(number => {
        if (winningNumbers.includes(number)) count++;
      });
      if (count === 6) {
        winningNumbersTemp[`1등`]++;
      } else if (count === 5 && numbers.includes(bonusNumber)) {
        winningNumbersTemp[`2등`]++;
      } else if (count === 5) {
        winningNumbersTemp[`3등`]++;
      } else if (count === 4) {
        winningNumbersTemp[`4등`]++;
      } else if (count === 3) {
        winningNumbersTemp[`5등`]++;
      }
    });
    this.setState({
      winningCount: winningNumbersTemp,
    });
  }

  generateLottoNumbers() {
    const lottoNumbers = new Set();
    while (lottoNumbers.size < LOTTO.LENGTH) {
      lottoNumbers.add(generateRandomNumber(LOTTO.MIN_NUM, LOTTO.MAX_NUM));
    }

    return sortNumbers([...lottoNumbers]);
  }

  static isValidLottoNumbers(numbers) {
    return (
      numbers.length === LOTTO.LENGTH &&
      new Set(numbers).size === numbers.length
    );
  }

  static isValidLottoNumbers2(winningNumbers, bonusNumber) {
    const allNumbers = [...winningNumbers, bonusNumber];
    const isInRange = (value, min = 1, max = 45) =>
      min <= value && value <= max;

    if (allNumbers.some(number => isNaN(number))) {
      return '숫자가 아닙니다.';
    }
    if (!allNumbers.every(number => isInRange(number))) {
      return '1~45 숫자 쓰세여';
    }
    if (allNumbers === LOTTO.LENGTH + 1) {
      return '로또 길이가 다르다.';
    }
    if (new Set(allNumbers).size !== allNumbers.length) {
      return '중복값이 있다.';
    }

    return '';
  }

  setState({ lottos, winningCount }) {
    this.lottos = lottos ?? this.lottos;
    this.winningCount = winningCount ?? this.winningCount;

    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  notify() {
    this.listeners.forEach(listener => listener());
  }
}
